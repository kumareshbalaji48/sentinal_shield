
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, Layers } from "lucide-react";

export default function LoadingGeoMap() {
  return (
    <MainLayout>
      <div className="flex flex-col h-full gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary" />
              <Skeleton className="h-8 w-3/5" />
            </div>
            <Skeleton className="h-4 w-4/5" />
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-4 gap-4 flex-1">
          {/* Control Panel Skeleton */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-2 p-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
              <Skeleton className="h-10 w-full mt-4" />
               <Skeleton className="h-8 w-full mt-4" />
            </CardContent>
            <CardHeader> {/* Footer like */}
                 <Skeleton className="h-10 w-full" />
            </CardHeader>
          </Card>

          {/* Map Display Area Skeleton */}
          <Card className="lg:col-span-3 min-h-[600px] lg:min-h-0">
            <CardContent className="h-full flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
