import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border flex items-center px-6 bg-gamer-gray/30 backdrop-blur-sm">
            <SidebarTrigger className="text-gamer-gold hover:text-gamer-red transition-colors" />
            <div className="ml-6">
              <h1 className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                RAT Clan Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Gerenciamento e estatísticas do clã Ratness
              </p>
            </div>
          </header>
          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}