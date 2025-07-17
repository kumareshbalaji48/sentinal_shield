
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

export function MiniMapSkeleton() {
  return (
    <div className="w-full h-full bg-muted/20 flex flex-col items-center justify-center rounded-md border border-dashed border-accent/30 animate-pulse">
      <MapPin className="h-8 w-8 text-accent/40 mb-2" />
      <p className="text-accent/60 text-sm">Loading Drone Map...</p>
      <Skeleton className="h-3 w-2/3 mt-2" />
    </div>
  );
}
