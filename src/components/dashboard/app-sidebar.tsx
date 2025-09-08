import { useState } from "react";
import { 
  Home, 
  Trophy, 
  Calendar, 
  Users, 
  Settings, 
  BarChart3,
  Shield,
  Sword,
  Crown
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Rankings", url: "/rankings", icon: Trophy },
  { title: "Eventos", url: "/events", icon: Calendar },
  { title: "Jogadores", url: "/players", icon: Users },
  { title: "Estatísticas", url: "/stats", icon: BarChart3 },
];

const adminNavigation = [
  { title: "Gerenciar Eventos", url: "/admin/events", icon: Shield },
  { title: "Configurações", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  
  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gamer-red/20 text-gamer-gold border-r-2 border-gamer-gold font-semibold" 
      : "text-muted-foreground hover:text-gamer-gold hover:bg-gamer-gray/30 transition-all duration-200";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-gamer-dark border-r border-border">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-demonic flex items-center justify-center">
              <Crown className="h-6 w-6 text-gamer-gold" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-gamer-gold">RAT</h2>
                <p className="text-xs text-muted-foreground">Clan Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gamer-gold">
            {!collapsed && "Principal"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClassName}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gamer-red">
            {!collapsed && "Administração"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer with gamer decoration */}
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center justify-center">
            <Sword className="h-4 w-4 text-gamer-red" />
            {!collapsed && (
              <span className="ml-2 text-xs text-muted-foreground">
                MIR4 Gaming
              </span>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}