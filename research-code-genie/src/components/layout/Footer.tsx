import { Github, Linkedin, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-xl border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gradient-text">Research paper to code</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              Transform research papers into ml  code using advanced AI. 
              Accelerate your machine learning workflow with intelligent code generation.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/MeerArsalanAli27" target="_blank" rel="noopener noreferrer" 
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
             
              <a href="https://www.linkedin.com/in/meer-arsalan-ali-852a632b6/?originalSubdomain=in" target="_blank" rel="noopener noreferrer"
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/generator" className="text-muted-foreground hover:text-primary transition-colors">AI Generator</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Tech Stack</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>CrewAI</li>
              <li>FastAPI</li>
              <li>React</li>
              <li>Python</li>
              <li>TensorFlow</li>
              <li>PyTorch</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Research Code Genie. Built with ❤️ for researchers and developers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;