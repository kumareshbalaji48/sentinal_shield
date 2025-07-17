import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Zap } from "lucide-react";

export default function LoadingAnalyzer() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-7 w-7 text-primary" />
              <Skeleton className="h-8 w-3/5" />
            </div>
            <Skeleton className="h-4 w-4/5" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </CardContent>
          <CardHeader> {/* Using CardHeader as a footer like element as CardFooter is not available */}
             <Skeleton className="h-10 w-1/3" />
          </CardHeader>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                {i < 3 && <Skeleton className="h-4 w-2/3" />}
              </div>
            ))}
             <div className="flex items-center gap-2 pt-2">
                <Skeleton className="h-4 w-[calc(100%-4rem)]" />
                <Skeleton className="h-4 w-10" />
              </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
