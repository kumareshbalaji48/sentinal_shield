
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BrainCircuit, ListFilter, Sparkles } from "lucide-react";

export default function LoadingAnomalies() {
  return (
    <MainLayout>
      <div className="space-y-6 md:space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <Skeleton className="h-8 w-3/5" />
            </div>
            <Skeleton className="h-4 w-4/5 mt-1.5" />
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 min-h-[calc(100vh-20rem)]">
          {/* Anomalies List Skeleton */}
          <Card className="lg:col-span-1">
            <CardHeader className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <ListFilter className="h-5 w-5 text-primary/90"/>
                    <Skeleton className="h-6 w-1/2" />
                </div>
                <div className="flex gap-2 mt-3">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 w-[120px]" />
                </div>
            </CardHeader>
            <CardContent className="p-3 space-y-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-3 rounded-md border bg-muted/30">
                  <div className="flex justify-between items-start mb-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                  <Skeleton className="h-3 w-full mb-1.5" />
                  <div className="flex justify-between items-center">
                     <Skeleton className="h-3 w-1/3" />
                     <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Correlation & Details Skeleton */}
          <Card className="lg:col-span-2">
             <CardHeader className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary"/>
                    <Skeleton className="h-7 w-3/4" />
                </div>
              </CardHeader>
            <div className="grid md:grid-cols-5 p-1 gap-1 h-full">
              <div className="md:col-span-2 p-3 space-y-3 border-r">
                 <Skeleton className="h-5 w-1/3 px-1" />
                 {[1,2,3].map(i => (
                     <div key={i} className="p-3.5 rounded-lg border bg-muted/40">
                         <div className="flex justify-between items-start mb-1">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-1/4" />
                         </div>
                         <Skeleton className="h-3 w-full mb-1.5" />
                          <Skeleton className="h-3 w-full" />
                          <div className="flex justify-between items-center mt-1.5">
                            <Skeleton className="h-3 w-1/3" />
                            <Skeleton className="h-3 w-1/3" />
                          </div>
                     </div>
                 ))}
              </div>
              <div className="md:col-span-3 p-4 space-y-4">
                <Skeleton className="h-6 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2" />
                <div className="p-3 rounded-md border space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                </div>
                 <Skeleton className="h-4 w-1/3" />
                 <Skeleton className="h-8 w-full rounded-md" />
                 <Skeleton className="h-8 w-full rounded-md" />
                 <div className="grid grid-cols-2 gap-3 pt-2">
                    <Skeleton className="h-16 w-full rounded-md" />
                    <Skeleton className="h-16 w-full rounded-md" />
                 </div>
                  <Skeleton className="h-10 w-full mt-auto" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
