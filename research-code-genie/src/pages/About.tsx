import { Github, Linkedin, Twitter, Mail, ExternalLink, Award, Code, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const About = () => {
  const projects = [
    {
      title: "YelpCamp - A Comprehensive Camping Review Platform",
      description: "A full-stack web application using MERN stack,offering a seamless experience for users to discover, review, and share camping experience",
      tech: ["Mongodb", "Node js","Express js", "React"],
      link: "https://github.com/MeerArsalanAli27/yelpamp_project/tree/master"
    },
    {
      title: "AI Resume Analyzer Web App using Next.js and Langchain",
      description: "A full-stack web app using Next.js for both frontend and backend, integrating Langchain for AI capabilities and other libraries for PDF parsing. Built a scalable and efficientapp with a seamless user experience, leveraging AI and ML",
      tech: [ "LangChain", "Next-js"],
      link: "https://github.com/MeerArsalanAli27/nextjs_resume_analyzer"
    },
    {
      title: "Rag-based Pdf-QA",
      description: "Combined text, image, and audio processing pipeline",
      tech: ["Langchain", "streamlit", "python"],
      link: "https://github.com/MeerArsalanAli27/RAG_QA_CHATBOT"
    },
   
  ];

  

  const skills = [
    "Machine Learning", "Deep Learning", "Computer Vision", "NLP",
    "PyTorch", "TensorFlow", "Python", "FastAPI", "React", "TypeScript",
    "Docker", "Kubernetes", "AWS", "GCP", "MLOps", "CrewAI"
  ];

  return (
    <Layout>
      <div className="min-h-screen py-12 mesh-bg">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="float-animation mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-accent mx-auto flex items-center justify-center">
                <Code className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Meet the Developer
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hi, I'm meer arsalan ali - a passionate AI and software engineer dedicated to 
              bridging the gap between cutting-edge research and practical applications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* About Me */}
            <div className="lg:col-span-2">
              <Card className="glow-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                
                  
                  
                  
                  <p className="text-muted-foreground">
                    The Research Code Genie project was born from my idea with the time-consuming process 
                    of implementing research papers. By leveraging CrewAI and advanced language models, 
                    I've created a tool that can save researchers and developers countless hours of manual coding.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div className="">
              

              {/* Contact */}
              <Card className="glow-card">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <a href="https://github.com/MeerArsalanAli27">
                    <Button variant="outline" size="sm" className="neon-border">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                    </a>
                    <a href="https://www.linkedin.com/in/meer-arsalan-ali-852a632b6/">
                    <Button variant="outline" size="sm" className="neon-border">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
              Featured Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="glow-card group">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-accent/10 text-accent rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a href={`${project.link}`}>

                    <Button variant="outline" size="sm" className="neon-border w-full">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
              Professional Journey
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    year: "aug 2024-nov 2024",
                    title: "full stack web dev intern",
                    company: "eve health care",
                    
                  },
                  
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-6 p-6 glow-card rounded-xl">
                    <div className="flex-shrink-0 w-24 text-sm font-mono text-primary">
                      {item.year}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-accent font-medium">{item.company}</p>
                    
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text">
              Let's Build Something Amazing Together!!
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interested in collaborating on AI projects or discussing 
              I'd love to hear from you!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/MeerArsalanAli27">

              <Button variant="outline" size="lg" className="neon-border">
                <Github className="h-5 w-5 mr-2" />
                View My Work
              </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;