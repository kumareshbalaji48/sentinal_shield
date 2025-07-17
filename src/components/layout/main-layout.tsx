
"use client";
import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar';
import { AppLogo } from '@/components/layout/app-logo';
import Link from 'next/link';
import { LayoutDashboard, BrainCircuit, ScanSearch, MessageSquare, Settings, UserCircle, Globe, Camera as DroneIcon, LogOut, BarChart3, ShieldCheck, AlertTriangle, Users, Siren, Sparkles, Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggleButton } from "@/components/features/theme-toggle-button";


const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { href: '/analyzer', label: 'Threat Analyzer', icon: BrainCircuit, key: 'analyzer' },
  { href: '/simulation', label: 'AR Simulation', icon: ScanSearch, key: 'simulation' },
  { href: '/comms', label: 'Secure Comms', icon: MessageSquare, key: 'comms' },
  { type: 'separator', key: 'adv-separator' },
  { type: 'label', label: 'Advanced Systems', key: 'adv-label'},
  { href: '/geo-map', label: 'Geo-Spatial Map', icon: Globe, key: 'geomap' },
  { href: '/drones', label: 'Drone Network', icon: DroneIcon, key: 'drones' },
  { href: '/digital-twin', label: 'Digital Twin', icon: BarChart3, key: 'digitaltwin' },
  { href: '/anomalies', label: 'Anomaly Correlation', icon: Sparkles, key: 'anomalies' },
  { href: '/emergency', label: 'Emergency Response', icon: Siren, key: 'emergency' },
];

export function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    const activeItem = navItems.find(item => {
      if (!item.href) return false;
      if (item.href === '/') return pathname === '/';
      return pathname.startsWith(item.href);
    });
    
    if (pathname.startsWith('/simulation/active')) return 'AR Simulation - Active Scenario';
    if (activeItem && activeItem.label) return activeItem.label;
    
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      return pathSegments.map(s => s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')).join(' - ');
    }
    
    return 'Sentinel Shield'; 
  };
  
  const isNavItemActive = (itemHref: string) => {
    if (itemHref === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(itemHref);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-sidebar-border/70 shadow-lg bg-sidebar-background group-data-[collapsible=icon]:shadow-md">
          <SidebarHeader className="flex h-[70px] items-center justify-center border-b border-sidebar-border/50 px-2">
            <AppLogo />
          </SidebarHeader>
          <SidebarContent className="p-2.5 custom-scrollbar">
            <SidebarMenu>
              {navItems.map((item) => {
                if (item.type === 'separator') {
                  return <SidebarMenuItem key={item.key}><div className="my-2.5 h-px bg-sidebar-border/40 group-data-[collapsible=icon]:hidden mx-2.5"></div></SidebarMenuItem>;
                }
                if (item.type === 'label') {
                  return <SidebarMenuItem key={item.key}><div className="px-3.5 py-2 text-xs font-semibold text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden tracking-wider uppercase">{item.label}</div></SidebarMenuItem>;
                }
                const isActive = item.href ? isNavItemActive(item.href) : false;
                return (
                  <SidebarMenuItem key={item.key}>
                    <motion.div whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 300 }}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={{ 
                          content: item.label, 
                          side: "right", 
                          align: "center", 
                          className: "bg-popover text-popover-foreground border-border/50 shadow-lg text-xs rounded-md" 
                        }}
                        className={cn(
                          "text-sm font-medium py-2.5 group",
                          isActive 
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md hover:bg-sidebar-primary/90" 
                            : "text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent",
                          "transition-all duration-200 ease-in-out rounded-lg" // Updated rounding
                        )}
                      >
                        <Link href={item.href || '#'} className="flex items-center gap-3.5 rounded-lg px-3.5">
                          {item.icon && <item.icon className={cn("h-5 w-5", isActive ? "text-sidebar-primary-foreground" : "group-hover:text-sidebar-accent-foreground transition-colors duration-200")} />}
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
           <SidebarHeader className="mt-auto border-t border-sidebar-border/50 p-2.5">
             <SidebarMenu>
                <SidebarMenuItem>
                   <motion.div whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 300 }}>
                    <SidebarMenuButton
                      asChild
                      tooltip={{ content: "Settings", side: "right", align: "center", className: "bg-popover text-popover-foreground border-border/50 shadow-lg text-xs rounded-md" }}
                      className="text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent transition-all duration-200 ease-in-out py-2.5 rounded-lg"
                    >
                      <Link href="#" className="flex items-center gap-3.5 rounded-lg px-3.5">
                        <Settings className="h-5 w-5" />
                        <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
             </SidebarMenu>
           </SidebarHeader>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-[70px] items-center justify-between gap-4 border-b border-border/50 glass-header px-4 shadow-sm sm:px-6 md:px-8">
            <div className="flex items-center gap-3">
              <SidebarTrigger variant="ghost" size="icon" className="md:hidden h-10 w-10 text-foreground/70 hover:text-foreground hover:bg-accent/10 focus-visible:ring-accent" />
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight md:text-2xl lg:text-3xl">
                {getPageTitle()}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggleButton />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-11 w-11 md:h-12 md:w-12 rounded-full hover:bg-accent/10 group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    <Avatar className="h-10 w-10 md:h-11 md:w-11 border-2 border-border/70 shadow-sm group-hover:border-primary transition-all duration-200">
                      <AvatarImage src="https://placehold.co/44x44.png/1A237E/FFFFFF?text=CO" alt="Control Operator Avatar" data-ai-hint="user avatar operator" />
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold text-base">CO</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 glass-card border-border/50 shadow-xl mt-2 p-2 rounded-lg">
                  <DropdownMenuLabel className="flex items-center gap-3 p-2.5 font-normal text-popover-foreground/95">
                      <UserCircle className="h-6 w-6 text-primary"/>
                      <div className="flex flex-col">
                          <span className="text-sm font-semibold">Operator Prime</span>
                          <span className="text-xs text-muted-foreground">ID: SNTNL-001</span>
                      </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/50 my-1.5" />
                  <DropdownMenuItem className="p-2.5 text-popover-foreground/80 hover:bg-muted/50 focus:bg-muted/50 transition-colors duration-150 rounded-md cursor-pointer group">
                      <Settings className="mr-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>User Preferences</span>
                  </DropdownMenuItem>
                   <DropdownMenuItem className="p-2.5 text-popover-foreground/80 hover:bg-muted/50 focus:bg-muted/50 transition-colors duration-150 rounded-md cursor-pointer group">
                      <ShieldCheck className="mr-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>Security Log</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50 my-1.5"/>
                  <DropdownMenuItem className="p-2.5 text-destructive hover:bg-destructive/15 focus:bg-destructive/15 focus:text-destructive transition-colors duration-150 rounded-md cursor-pointer group">
                      <LogOut className="mr-2.5 h-4 w-4 group-hover:text-destructive transition-colors" />
                      <span>Logout Session</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname} // Keying by pathname triggers animation on route change
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              className="flex-1 overflow-auto p-4 sm:p-5 md:p-6 lg:p-8 bg-background relative animated-bg-dots"
            >
              <div className="relative z-10"> 
                {children}
              </div>
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </SidebarProvider>
  );
}
