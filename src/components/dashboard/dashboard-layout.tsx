import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-gamer-gray/30 backdrop-blur-sm">
            <div className="flex items-center">
              <SidebarTrigger className="text-gamer-gold hover:text-gamer-red transition-colors" />
              <div className="ml-6">
                <h1 className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                  RAT Clan Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Gerenciamento e estatísticas do clã Ratness
                </p>
              </div>
            </div>
            <Button 
              variant="gamer-outline" 
              size="sm"
              onClick={() => window.location.href = '/profile/current-user'}
              className="text-gamer-gold border-gamer-gold hover:bg-gamer-gold hover:text-black"
            >
              Meu Perfil
            </Button>
          </header>
          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}