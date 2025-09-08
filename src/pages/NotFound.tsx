import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="gamer-card p-12 text-center max-w-md">
        <AlertTriangle className="h-16 w-16 text-gamer-red mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gamer-gold mb-4">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-4">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button variant="gamer" asChild>
          <a href="/">
            <Home className="h-4 w-4" />
            Voltar ao Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
