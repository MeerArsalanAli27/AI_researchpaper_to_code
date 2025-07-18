

import base64
from PIL import Image
from typing import List, Dict, Optional
import requests
import io
import easyocr
import numpy as np
# Initialize OCR reader
reader = easyocr.Reader(['en'])
def extract_text_from_image(image_url: str) -> Dict:
    """Extract text from an image URL using OCR and return image details"""
    try:
        response = requests.get(image_url, timeout=5)
        img = Image.open(io.BytesIO(response.content))
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        base64_image = base64.b64encode(buffer.getvalue()).decode()
        result = reader.readtext(np.array(img), detail=0, paragraph=True)
        extracted_text = "\n".join(result).strip()
        return {
            'image': base64_image,
            'extracted_text': extracted_text,
            'size': img.size,
            'format': img.format or 'PNG'
        }
    except Exception as e:
        # If OCR fails, return the raw image without extracted text
        return {
            'image': base64.b64encode(response.content).decode(),
            'extracted_text': None,
            'error': str(e)
        }
