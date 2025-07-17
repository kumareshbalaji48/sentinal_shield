
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanSearch, Layers3, PlayCircle, ArrowRight, ShieldCheck, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SimulationPage() {
  return (
    <MainLayout>
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="shadow-xl lg:col-span-3 border-2 border-primary/30 bg-card/80 backdrop-blur-sm animate-slideUp">
          <CardHeader className="p-6">
            <CardTitle className="text-2xl md:text-3xl flex items-center gap-3 text-primary text-glow-primary">
              <ScanSearch className="h-8 w-8 md:h-9 md:w-9" />
              AR Simulation & Training Module
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground/90 mt-1">
              Immersive, real-world training scenarios powered by Augmented Reality for unparalleled CBRN incident response preparedness.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <p className="text-foreground/80 leading-relaxed">
              Sentinel Shield's AR Simulation Module provides an interactive, dynamic environment for personnel to train for a multitude of complex CBRN scenarios. 
              By overlaying critical digital information onto the real world, trainees can visualize threats, practice containment and decontamination procedures, and hone decision-making skills under pressure—all within a safe, controlled, and highly realistic setting.
            </p>
            <div className="space-y-4 p-5 bg-muted/40 rounded-lg border border-border/70 shadow-sm">
              <h4 className="font-semibold text-lg md:text-xl flex items-center gap-2.5 text-primary/95">
                <Layers3 className="h-6 w-6" /> Key Training Capabilities:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pl-2 text-sm text-muted-foreground">
                {[
                  "Realistic AR overlays of hazardous zones & material dispersion.",
                  "Interactive scenarios for decontamination & equipment handling.",
                  "Multi-user collaborative training exercises.",
                  "Dynamic scenario generation based on AI threat predictions.",
                  "Performance analytics and After Action Review (AAR) system.",
                  "Evacuation route planning and validation simulations.",
                  "Integration with facility's digital twin for site-specific training.",
                  "Emergency communication protocol drills."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary/70 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
             <p className="text-sm text-muted-foreground/80 pt-2">
              Equip your teams with the most advanced AR training solution. Prepare for any eventuality, minimize risk, and maximize operational readiness.
            </p>
          </CardContent>
          <CardFooter className="p-6 bg-card/50 border-t border-primary/20">
            <Button asChild className="w-full md:w-auto text-lg py-3.5 px-8 group bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg hover:shadow-glow-primary-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-primary">
              <Link href="/simulation/active">
                <PlayCircle className="mr-2.5 h-5 w-5 group-hover:animate-pulse" />
                Launch Active Scenario
                <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <div className="lg:col-span-2 flex items-center justify-center p-4 bg-gradient-to-br from-muted/20 to-card/30 rounded-lg shadow-inner border border-border/50 aspect-video lg:aspect-auto animate-slideUp animation-delay-200">
            <Image 
                src="https://placehold.co/600x450.png/0A0F14/14FFEC?text=AR+SIMULATION+INTERFACE" 
                alt="AR Simulation Interface Mockup showing augmented reality overlay" 
                width={600} 
                height={450} 
                className="rounded-lg shadow-2xl object-cover transform hover:scale-105 transition-transform duration-300 border-2 border-primary/40 hover:shadow-glow-primary-md"
                data-ai-hint="AR interface simulation"
            />
        </div>
      </div>
    </MainLayout>
  );
}
