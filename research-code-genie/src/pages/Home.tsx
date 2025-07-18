import { ArrowRight, Brain, Code, Zap, FileText, Cpu, Database, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import SplineScene from '@/components/ui/spline-scene';
import heroImage from '@/assets/hero-bg.jpg';
import workspaceImage from '@/assets/workspace-3d.jpg';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced CrewAI agents analyze research papers to extract key algorithms and methodologies"
    },
    {
      icon: Code,
      title: "Multi-Framework Support", 
      description: "Generate production-ready code in PyTorch, TensorFlow, and other ML frameworks"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Transform complex research papers into working code in minutes, not hours"
    },
    {
      icon: FileText,
      title: "PDF & URL Support",
      description: "Process research papers from URLs or upload PDFs directly for analysis"
    }
  ];

  const techStack = [
    { name: "CrewAI", description: "Multi-agent AI orchestration" },
    { name: "FastAPI", description: "High-performance Python API" },
    { name: "React", description: "Modern frontend framework" },
    { name: "PyTorch", description: "Deep learning framework" },
    { name: "TensorFlow", description: "ML platform" },
 
  ];

  const useCases = [
    {
      title: "Academic Research",
      description: "Quickly implement paper algorithms for validation and experimentation",
      icon: "🎓"
    },
    {
      title: "Industry Applications", 
      description: "Prototype cutting-edge research findings in production environments",
      icon: "🏢"
    },
    {
      title: "Learning & Education",
      description: "Understand complex ML papers through interactive code examples",
      icon: "📚"
    },
   
  ];

  return (
    <Layout className="overflow-hidden">
      {/* Enhanced Hero Section with 3D Elements */}
      <section className="relative min-h-screen flex items-center justify-center mesh-bg perspective-container">
        <div className="absolute inset-0 opacity-30">
          <img src={heroImage} alt="AI Research Background" className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="float-3d mb-8">
              <Sparkles className="h-20 w-20 text-primary mx-auto mb-6 glow-text" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight card-3d">
              Transform <span className="gradient-text glow-text">Research Papers</span>
              <br />
              Into <span className="gradient-text glow-text">Production Code</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Leverage advanced AI to automatically convert cutting-edge research papers 
              into working machine learning code. From paper to code in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/generator">
                <Button size="lg" className="btn-3d text-lg px-8 py-4 group interactive-360">
                  Start Generating Code
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 neon-border card-3d">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Enhanced 3D Floating Elements */}
        <div className="absolute top-20 left-10 float-3d pulse-turquoise">
          <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full opacity-40 blur-sm"></div>
        </div>
        <div className="absolute bottom-32 right-16 rotate-3d">
          <div className="w-32 h-32 bg-gradient-to-r from-accent to-primary rounded-full opacity-30 blur-md"></div>
        </div>
        <div className="absolute top-1/3 left-1/5 interactive-360">
          <div className="w-16 h-16 bg-primary rounded-full opacity-50 blur-lg"></div>
        </div>
        <div className="absolute bottom-1/4 left-3/4 float-3d" style={{ animationDelay: '1.5s' }}>
          <div className="w-20 h-20 bg-accent rounded-full opacity-35 blur-md"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge AI technology to streamline your research-to-code workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glow-card p-6 text-center group">
                  <CardContent className="p-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 mesh-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
                Real-World Applications
              </h2>
              
              <div className="space-y-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 glow-card rounded-xl">
                    <div className="text-3xl">{useCase.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-muted-foreground">{useCase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl float-animation h-96">
                <SplineScene className="w-full h-full" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Powered by Modern Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built on a robust stack of cutting-edge technologies for maximum performance and reliability
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <Card key={index} className="glow-card p-6 text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg mx-auto flex items-center justify-center">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 mesh-bg">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Transform Your Research?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of researchers and developers who are accelerating their ML workflows
            </p>
            
            <Link to="/generator">
              <Button size="lg" className="btn-3d text-lg px-12 py-6 group">
                Start Now - It's Free
                <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;