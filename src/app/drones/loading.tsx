
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera } from "lucide-react";

export default function LoadingDrones() {
  return (
    <MainLayout>
      <div className="flex flex-col h-full gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Camera className="h-8 w-8 text-primary" />
              <Skeleton className="h-8 w-3/5" />
            </div>
            <Skeleton className="h-4 w-4/5" />
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 flex-1">
          {/* Drone List Skeleton */}
          <div className="lg:col-span-1 space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-1/2 mt-1" />
                </CardHeader>
                <CardContent className="p-4 space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Video Feed Skeleton */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-7 w-1/2" />
                <Skeleton className="h-7 w-7 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 relative p-0 aspect-video">
              <Skeleton className="w-full h-full" />
            </CardContent>
            <CardHeader className="p-3 grid grid-cols-3 gap-2"> {/* Footer like */}
                <div className="col-span-2 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <div className="flex gap-2">
                        <Skeleton className="h-8 flex-1" />
                        <Skeleton className="h-8 flex-1" />
                        <Skeleton className="h-8 flex-1" />
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-4 w-1/2 mt-1 self-end" />
                </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
