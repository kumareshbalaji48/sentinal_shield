
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Siren, Bell, ChevronsUpDown, AlertTriangle } from "lucide-react";

export default function LoadingEmergency() {
  return (
    <MainLayout>
      <div className="space-y-6 md:space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <Siren className="h-8 w-8 text-destructive" />
              <Skeleton className="h-8 w-3/5" />
            </div>
            <Skeleton className="h-4 w-4/5 mt-1.5" />
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 min-h-[calc(100vh-20rem)]">
          {/* Incidents List Skeleton */}
          <Card className="lg:col-span-1">
            <CardHeader className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-destructive/90"/>
                    <Skeleton className="h-6 w-1/2" />
                </div>
            </CardHeader>
            <CardContent className="p-3 space-y-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3.5 rounded-lg border bg-muted/30">
                  <div className="flex justify-between items-start mb-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                  <Skeleton className="h-3 w-1/2 mb-0.5" />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-1.5 w-full mt-1.5" />
                  <Skeleton className="h-2.5 w-1/3 mt-1" />
                </div>
              ))}
            </CardContent>
             <CardHeader> {/* Footer like */}
                <Skeleton className="h-10 w-full" />
            </CardHeader>
          </Card>

          {/* Incident Details & Map Skeleton */}
          <Card className="lg:col-span-2">
             <CardHeader className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-destructive"/>
                    <Skeleton className="h-7 w-3/4" />
                </div>
                <Skeleton className="h-3 w-1/2 mt-0.5" />
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-3 p-3">
                <div className="space-y-3">
                    <Skeleton className="h-20 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-28 w-full rounded-md" />
                </div>
                <Skeleton className="min-h-[250px] md:min-h-full w-full rounded-md" /> {/* Map placeholder */}
              </CardContent>
               <CardHeader> {/* Footer like */}
                    <Skeleton className="h-10 w-full" />
               </CardHeader>
          </Card>

          {/* Teams & Action Log Skeleton */}
           <Card className="lg:col-span-3">
             <CardHeader className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <ChevronsUpDown className="h-5 w-5 text-primary/90"/>
                    <Skeleton className="h-6 w-1/2" />
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-0 md:gap-px">
                <div className="p-3 space-y-2">
                     <Skeleton className="h-5 w-1/3 px-1 mb-2" />
                     {[1,2,3,4].map(i => (
                        <div key={i} className="flex justify-between items-center p-2 border-b">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-6 w-1/5 rounded-md" />
                            <Skeleton className="h-4 w-[10%]" />
                        </div>
                     ))}
                </div>
                 <div className="p-3 space-y-2.5">
                    <Skeleton className="h-5 w-1/3 px-1 mb-2" />
                    {[1,2,3,4].map(i => (
                        <div key={i} className="p-2.5 bg-muted/30 border rounded-md space-y-1">
                            <Skeleton className="h-3 w-full" />
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-2.5 w-1/3" />
                                <Skeleton className="h-2.5 w-1/3" />
                            </div>
                        </div>
                    ))}
                </div>
              </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
