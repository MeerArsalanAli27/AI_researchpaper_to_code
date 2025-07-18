
import os
import asyncio
import requests
import re
import io
import base64
from PIL import Image
import numpy as np
from crewai import Agent, Task, Crew, Process
from pdf2image import convert_from_bytes
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from crawl4ai import AsyncWebCrawler  # Updated crawler
from typing import List, Dict, Optional
import easyocr
from urllib.parse import urlparse
import uvicorn
from utils.fall_back_code import fallback_code
from utils.find_formulas import find_formulas
from utils.extract_text_from_image import extract_text_from_image
from PyPDF2 import PdfReader
from crewai.tools import BaseTool

app = FastAPI(title="Paper Code Generator API", version="1.0.0")

# Initialize OCR reader
reader = easyocr.Reader(['en'])

# Define PDFReadTool
class PDFReadTool(BaseTool):
    name: str = "PDFReadTool"
    description: str = "Extracts text from a PDF file"

    def _run(self, file_path: str) -> str:
        """Extract text from a PDF file"""
        try:
            reader = PdfReader(file_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
            return text
        except Exception as e:
            raise ValueError(f"Error reading PDF: {e}")


class ProcessResponse(BaseModel):
    text: str
    formulas: List[str]
    images_with_text: List[Dict]  # Contains image data and extracted text
    code: str




@app.post('/process_url', response_model=ProcessResponse)
async def process_url(
    url: str = Form(...),  # URL must be provided as form data
    framework: str = Form("PyTorch"),  # Default to PyTorch, but can be overridden
    llm: str = Form("OpenAI"),  # Default to OpenAI, but can be overridden
    api_key: str = Form(...)  # API key is required
):
    """Process a research paper URL, extract text, formulas, and images, and generate ML code"""
    if not url:
        raise HTTPException(status_code=400, detail="URL is required")

    # Set API key
    llm_env_map = {
        "Grok": "XAI_API_KEY",
        "OpenAI": "OPENAI_API_KEY",
        "Anthropic": "ANTHROPIC_API_KEY",
        "Gemini": "GOOGLE_API_KEY"
    }
    os.environ[llm_env_map[llm]] = api_key

    try:
        # Scrape content using AsyncWebCrawler
        async with AsyncWebCrawler() as crawler:
            result = await crawler.arun(url=url, bypass_cache=True)

        # Extract relevant data
        text = result.markdown  # Use markdown output from the crawler
        formulas = find_formulas(text)
        images = result.images  # Extract images from the crawler result

        # Extract text and metadata from images
        images_with_text = []
        for img_url in images:
            image_data = extract_text_from_image(img_url)
            images_with_text.append(image_data)

        # Prepare context for LLM
        context = f"""
Paper Content:
- Text: {text[:500]}
- Formulas: {formulas[:2]}
- Images: {[img['extracted_text'] or 'Image provided as base64' for img in images_with_text]}
Generate a concise {framework} ML pipeline:
1. Data preparation
2. Model (CNN if images or 'image'/'cnn' in text; else MLP)
3. Training  code with Adam optimizer and cross-entropy loss code
4. Evaluation with accuracy
5. Example usage
Use relu activation, CrossEntropyLoss unless formulas suggest otherwise.
"""

        # Generate code using CrewAI
        scraper_agent = Agent(
            role='Paper Scraper',
            goal='Extract text, formulas, and images',
            llm=llm.lower(),
            verbose=True
        )
        analyzer = Agent(
            role='Content Analyzer',
            goal='Identify algorithms and parameters',
            llm=llm.lower(),
            verbose=True
        )
        coder = Agent(
            role='Code Generator',
            goal=f'Generate concise {framework} full ML code',
            llm=llm.lower(),
            verbose=True
        )

        # Define tasks
        scrape_task = Task(
            description="Extract text, formulas, images",
            agent=scraper_agent,
            expected_output="Text, formulas, images"
        )
        analyze_task = Task(
            description="Analyze content for ML model",
            agent=analyzer,
            expected_output="Model parameters"
        )
        code_task = Task(
            description=f"Generate {framework} code with context:\n{context}",
            agent=coder,
            expected_output=f"Concise {framework} ML pipeline"
        )

        # Run crew
        crew = Crew(
            agents=[scraper_agent, analyzer, coder],
            tasks=[scrape_task, analyze_task, code_task],
            process=Process.sequential
        )
        try:
            result = crew.kickoff()
            code = str(result.get('code_task', ''))
            if not code or 'error' in code.lower():
                code = fallback_code(text, framework, images, formulas)
        except Exception as e:
            # Use fallback if CrewAI fails
            code = fallback_code(text, framework, images, formulas)

        return ProcessResponse(
            text=text,
            formulas=formulas,
            images_with_text=images_with_text,
            code=code
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post('/process_pdf', response_model=ProcessResponse)
async def process_pdf(
    file: UploadFile = File(...),
    framework: str = Form("PyTorch"),  # Default to PyTorch, but can be overridden
    llm: str = Form("OpenAI"),  # Default to OpenAI, but can be overridden
    api_key: str = Form(...)
):
    """Process a PDF file and generate ML code"""
    if not api_key:
        raise HTTPException(status_code=400, detail="API key is required")

    # Set API key
    llm_env_map = {
        "Grok": "XAI_API_KEY",
        "OpenAI": "OPENAI_API_KEY",
        "Anthropic": "ANTHROPIC_API_KEY",
        "Gemini": "GOOGLE_API_KEY"
    }
    os.environ[llm_env_map[llm]] = api_key

    try:
        # Read PDF file
        pdf_bytes = await file.read()
        text = PDFReadTool()._run(file_path=io.BytesIO(pdf_bytes))
        images = convert_from_bytes(pdf_bytes, fmt='png')

        # Extract formulas
        formulas = re.findall(r'\$\$([^$]+)\$\$|\$([^$]+)\$|\\begin\{equation\}(.*?)\\end\{equation\}', text, re.DOTALL)
        formulas = [f for group in formulas for f in group if f]

        # Analyze images using OCR
        image_analysis = []
        for img in images:
            buffer = io.BytesIO()
            img.save(buffer, format="PNG")
            base64_image = base64.b64encode(buffer.getvalue()).decode()
            result = reader.readtext(np.array(img), detail=0, paragraph=True)
            extracted_text = "\n".join(result).strip()
            image_analysis.append({
                'image': base64_image,
                'extracted_text': extracted_text,
                'size': img.size,
                'format': img.format or 'PNG'
            })

        # Prepare context for LLM
        context = f"""
Paper Content:
- Text: {text[:500]}
- Formulas: {formulas[:2]}
- Images: {[img['extracted_text'] or 'Image provided as base64' for img in image_analysis]}
Generate a concise {framework} ML pipeline:
1. Data preparation
2. Model (CNN if images or 'image'/'cnn' in text; else MLP)
3. Training with Adam
4. Evaluation with accuracy
5. Example usage
Use relu activation, CrossEntropyLoss unless formulas suggest otherwise.
"""

        # Generate code using CrewAI
        scraper_agent = Agent(
            role='Paper Scraper',
            goal='Extract text, formulas, and images',
            llm=llm.lower(),
            verbose=True
        )
        analyzer = Agent(
            role='Content Analyzer',
            goal='Identify algorithms and parameters',
            llm=llm.lower(),
            verbose=True
        )
        coder = Agent(
            role='Code Generator',
            goal=f'Generate concise {framework} full ML code',
            llm=llm.lower(),
            verbose=True
        )

        # Define tasks
        scrape_task = Task(
            description="Extract text, formulas, images",
            agent=scraper_agent,
            expected_output="Text, formulas, images"
        )
        analyze_task = Task(
            description="Analyze content for ML model",
            agent=analyzer,
            expected_output="Model parameters"
        )
        code_task = Task(
            description=f"Generate {framework} code with context:\n{context}",
            agent=coder,
            expected_output=f"Concise {framework} ML pipeline"
        )

        # Run crew
        crew = Crew(
            agents=[scraper_agent, analyzer, coder],
            tasks=[scrape_task, analyze_task, code_task],
            process=Process.sequential
        )
        try:
            result = crew.kickoff()
            code = str(result.get('code_task', ''))
            if not code or 'error' in code.lower():
                code = fallback_code(text, framework, images, formulas)
        except Exception as e:
            # Use fallback if CrewAI fails
            code = fallback_code(text, framework, images, formulas)

        return ProcessResponse(
            text=text,
            formulas=formulas,
            image_analysis=image_analysis,
            code=code
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get('/health')
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.get('/')
async def root():
    """Root endpoint with API information"""
    return {
        "name": "Paper Code Generator API",
        "version": "1.0.0",
        "endpoints": {
            "process_url": "POST /process_url - Process URL and generate ML code",
            "process_pdf": "POST /process_pdf - Process PDF and generate ML code",
            "health": "GET /health - Health check"
        },
        "supported_llms": ["Grok", "OpenAI", "Anthropic", "Gemini"],
        "supported_frameworks": ["PyTorch", "TensorFlow"]
    }


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8001)