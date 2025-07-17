
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, BarChartHorizontalBig, ShieldCheck, Wrench } from "lucide-react";

export default function LoadingDigitalTwin() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building className="h-8 w-8 text-primary" />
              <Skeleton className="h-8 w-3/5" />
            </div>
            <Skeleton className="h-4 w-4/5" />
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-4 w-1/3 mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
                <BarChartHorizontalBig className="h-6 w-6 text-primary"/>
                <Skeleton className="h-6 w-1/2" />
            </div>
          </CardHeader>
          <CardContent className="h-[300px] p-2">
            <Skeleton className="w-full h-full" />
          </CardContent>
        </Card>
        
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
            <CardHeader>
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-primary"/>
                    <Skeleton className="h-6 w-1/2" />
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {[1,2,3].map(i => (
                    <div key={i} className="p-3">
                        <div className="flex justify-between items-center mb-1">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-5 w-1/4" />
                        </div>
                        <Skeleton className="h-2.5 w-full" />
                        <Skeleton className="h-3 w-1/4 mt-1 ml-auto" />
                    </div>
                ))}
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                 <div className="flex items-center gap-2">
                    <Wrench className="h-6 w-6 text-primary"/>
                    <Skeleton className="h-6 w-1/2" />
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-40 w-full" /> {/* Table Skeleton */}
            </CardContent>
             <CardHeader> {/* Footer-like */}
                <Skeleton className="h-10 w-full" />
            </CardHeader>
            </Card>
        </div>

         <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
                <div key={i} className="p-4 rounded-lg border">
                    <Skeleton className="h-4 w-2/3 mx-auto" />
                    <Skeleton className="h-8 w-1/2 mx-auto mt-2" />
                </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}
