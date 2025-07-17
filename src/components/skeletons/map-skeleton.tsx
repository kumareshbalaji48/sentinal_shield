
import { Skeleton } from "@/components/ui/skeleton";
import { MapIcon } from "lucide-react";

export function MapSkeleton() {
  return (
    <div className="w-full h-full bg-muted/30 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-primary/30 animate-pulse">
      <MapIcon className="h-16 w-16 text-primary/40 mb-4" />
      <p className="text-primary/60 text-lg font-semibold">Loading Geospatial Data...</p>
      <Skeleton className="h-4 w-3/4 mt-3" />
      <Skeleton className="h-4 w-1/2 mt-2" />
    </div>
  );
}
