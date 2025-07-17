
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Layers, PauseIcon, Settings, Maximize, AlertTriangle, Video, VideoOff, Target, Power, Eye, Activity, Thermometer, Wifi, Battery, ShieldAlert, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ActiveSimulationPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);
  const [isAnomalyModeActive, setIsAnomalyModeActive] = useState(false);
  const [mockAnomalies, setMockAnomalies] = useState<{ id: number; x: string; y: string; type: 'thermal' | 'radiation' | 'structural' }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: "destructive",
          title: "Camera Not Supported",
          description: "Your browser does not support camera access or is not available in this environment (e.g. non-HTTPS).",
        });
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use this feature. Ensure the page is served over HTTPS.",
        });
      }
    };
    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  useEffect(() => {
    let anomalyInterval: NodeJS.Timeout;
    if (isAnomalyModeActive && hasCameraPermission && !isSimulationPaused) {
      const generateAnomalies = () => {
        const anomalyTypes: ('thermal' | 'radiation' | 'structural')[] = ['thermal', 'radiation', 'structural'];
        const newAnomalies = Array.from({ length: Math.floor(Math.random() * 2) + 2 }, (_, i) => ({ 
          id: Date.now() + i,
          x: `${Math.random() * 70 + 15}%`, 
          y: `${Math.random() * 60 + 20}%`,
          type: anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)],
        }));
        setMockAnomalies(newAnomalies);
      };
      generateAnomalies(); 
      anomalyInterval = setInterval(generateAnomalies, 5000 + Math.random() * 2000); 
    } else {
      setMockAnomalies([]);
    }
    return () => clearInterval(anomalyInterval);
  }, [isAnomalyModeActive, hasCameraPermission, isSimulationPaused]);

  const getAnomalyStyle = (type: 'thermal' | 'radiation' | 'structural') => {
    switch(type) {
      case 'thermal': return "border-orange-400 bg-orange-500/30 animate-[ping-slow_2s_infinite]";
      case 'radiation': return "border-lime-400 bg-lime-500/30 animate-[ping-slow_1.5s_infinite]";
      case 'structural': return "border-sky-400 bg-sky-500/30 animate-[ping-slow_2.5s_infinite]";
      default: return "border-red-500 bg-red-500/30 animate-ping";
    }
  };
  
  const HudItem = ({ label, value, icon: Icon, valueColor = "text-accent", unit = "" }: { label: string, value: string | number, icon?: React.ElementType, valueColor?: string, unit?: string }) => (
    <div className="flex items-center gap-1.5">
      {Icon && <Icon className="h-3.5 w-3.5 text-primary/80" />}
      <span className="text-xs uppercase tracking-wider text-primary/70">{label}:</span>
      <span className={`font-mono text-sm font-medium ${valueColor}`}>{value}{unit}</span>
    </div>
  );


  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-9rem)] items-center justify-center p-1 sm:p-2 md:p-4 space-y-3 sm:space-y-4">
        <Card className="w-full max-w-6xl shadow-2xl border-2 border-primary/40 bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col h-full animate-fadeIn">
          <CardHeader className="cyber-panel p-3 sm:p-4 border-b border-primary/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2 text-primary text-glow-primary">
                <Layers className="h-6 w-6 sm:h-7 sm:w-7 text-primary animate-pulse" />
                AR Simulation: Sector Gamma Coolant Leak Scenario
              </CardTitle>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button variant="ghost" size="icon" className="text-primary/80 hover:text-primary hover:bg-primary/10 h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:shadow-glow-primary-sm">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
                <Button variant="ghost" size="icon" className="text-primary/80 hover:text-primary hover:bg-primary/10 h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:shadow-glow-primary-sm">
                  <Maximize className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Fullscreen</span>
                </Button>
              </div>
            </div>
            <CardDescription className="text-muted-foreground text-xs sm:text-sm mt-0.5">System Status: <span className={cn(isSimulationPaused ? "text-yellow-400" : "text-green-400", "font-semibold")}>{isSimulationPaused ? "Paused" : "Active"}</span></CardDescription>
          </CardHeader>
          
          <CardContent className="p-0 flex-1 relative bg-black overflow-hidden">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]" autoPlay playsInline muted />
            
            {hasCameraPermission === false && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-4 sm:p-8 text-center">
                <VideoOff className="h-16 w-16 text-destructive mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-destructive-foreground mb-2">Camera Access Required</h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-md">
                  AR Simulation requires camera access. Please enable permissions in your browser settings and refresh. Ensure page is served via HTTPS.
                </p>
                 <Image
                    src="https://placehold.co/1280x720.png"
                    alt="System offline error screen"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20 -z-10"
                    data-ai-hint="error screen offline"
                  />
              </div>
            )}
            {hasCameraPermission === null && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-primary text-lg text-glow-primary">Initializing Camera Feed...</p>
                </div>
            )}

            {hasCameraPermission && (
              <>
                {/* HUD Elements */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 p-2 sm:p-3 bg-black/70 backdrop-blur-sm rounded-md border border-primary/30 shadow-lg space-y-1.5 z-10">
                  <HudItem label="Objective" value="Locate Leak Source" icon={Target} valueColor="text-yellow-400"/>
                  <HudItem label="Threat Level" value="Medium" icon={ShieldAlert} valueColor="text-orange-400"/>
                  <HudItem label="Est. Radiation" value="0.85" unit="mSv/h" icon={Thermometer} valueColor="text-lime-400"/>
                </div>

                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 p-2 sm:p-3 bg-black/70 backdrop-blur-sm rounded-md border border-primary/30 shadow-lg text-right space-y-1.5 z-10">
                  <HudItem label="Time" value={currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} />
                  <HudItem label="Vitals" value="Stable" icon={Activity} valueColor="text-green-400"/>
                  <HudItem label="Comms" value="Strong" icon={Wifi} valueColor="text-green-400"/>
                  <HudItem label="Power" value="72%" icon={Battery} valueColor="text-green-400"/>
                </div>

                {/* Central Reticle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/70 z-10">
                  <Target className="h-10 w-10 sm:h-12 sm:w-12 opacity-60 animate-pulse" />
                </div>
                
                {isAnomalyModeActive && mockAnomalies.map(anomaly => (
                  <div
                    key={anomaly.id}
                    className={cn(
                      "absolute w-10 h-10 sm:w-14 sm:h-14 border-2 rounded-full opacity-80 pointer-events-none z-20",
                      getAnomalyStyle(anomaly.type)
                    )}
                    style={{ left: anomaly.x, top: anomaly.y }}
                  >
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                       <span className="text-xs text-white/70 font-mono">{anomaly.type.substring(0,3).toUpperCase()}</span>
                    </div>
                  </div>
                ))}
                
                {isSimulationPaused && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-30">
                        <PauseIcon className="h-16 w-16 text-primary mb-4 text-glow-primary" />
                        <p className="text-primary text-2xl font-semibold text-glow-primary">SIMULATION PAUSED</p>
                    </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
        
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 items-center gap-2 sm:gap-4 p-2.5 sm:p-3 cyber-panel rounded-lg shadow-md animate-slideUp animation-delay-200">
          <div className="md:col-span-1 flex items-center justify-center md:justify-start gap-3">
             <div className="flex items-center space-x-2.5">
                <Switch 
                    id="anomaly-mode" 
                    checked={isAnomalyModeActive} 
                    onCheckedChange={setIsAnomalyModeActive}
                    disabled={!hasCameraPermission || isSimulationPaused}
                    aria-label="Toggle Anomaly Detection Mode"
                    className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-muted/50 focus-visible:ring-accent"
                />
                <Label htmlFor="anomaly-mode" className="flex items-center gap-1.5 text-sm sm:text-base text-primary/90 cursor-pointer hover:text-primary transition-colors">
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5"/> Anomaly Detection
                </Label>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-center md:justify-end gap-2 sm:gap-3">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto group border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-glow-primary-md transition-all duration-200" 
              onClick={() => setIsSimulationPaused(!isSimulationPaused)} 
              disabled={!hasCameraPermission}
            >
              {isSimulationPaused ? <Video className="mr-2 h-4 w-4" /> : <PauseIcon className="mr-2 h-4 w-4" />} 
              {isSimulationPaused ? "Resume" : "Pause"} Simulation
            </Button>
            <Button asChild variant="destructive" className="w-full sm:w-auto group bg-destructive/80 hover:bg-destructive hover:shadow-glow-destructive-md transition-all duration-200">
              <Link href="/simulation">
                <Power className="mr-2 h-4 w-4 group-hover:animate-pulse" /> Exit Scenario
              </Link>
            </Button>
          </div>
        </div>
         <div className="w-full max-w-6xl text-center text-xs text-muted-foreground/80 flex items-center justify-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
            <span>This is a simulated training environment. Actions do not affect real-world systems. Use with caution.</span>
        </div>
      </div>
    </MainLayout>
  );
}
