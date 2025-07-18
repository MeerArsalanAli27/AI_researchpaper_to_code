import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center mesh-bg">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="float-animation mb-8">
            <div className="text-8xl font-bold gradient-text mb-4">404</div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="btn-3d group">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
            
            <Button variant="outline" onClick={() => window.history.back()} className="neon-border">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
