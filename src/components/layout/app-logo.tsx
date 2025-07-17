
import { ShieldHalf } from 'lucide-react'; // Changed to ShieldHalf for a slightly different look

export function AppLogo() {
  return (
    <div className="flex items-center gap-2.5 p-1 group" aria-label="Sentinel Shield Logo">
      <ShieldHalf className="h-9 w-9 text-sidebar-primary group-hover:animate-ping-slow transition-all duration-300 transform group-hover:scale-110" />
      <span className="text-2xl font-bold tracking-tighter text-sidebar-foreground group-data-[collapsible=icon]:hidden group-hover:text-glow-primary transition-all duration-300">
        Sentinel Shield
      </span>
    </div>
  );
}
