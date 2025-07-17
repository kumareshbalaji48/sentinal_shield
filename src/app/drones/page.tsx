
"use client";

import React, { useState, useEffect, useId } from 'react'; 
import dynamic from 'next/dynamic';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Camera, BatteryFull, Wifi, Maximize, Navigation, ZoomIn, ZoomOut, Orbit, Power, Thermometer, MapPin, Zap, Ban, Clock } from "lucide-react";
import { cn } from '@/lib/utils';
import { MiniMapSkeleton } from '@/components/skeletons/mini-map-skeleton';


const DroneMapDisplay = dynamic(() => import('@/components/features/drone-map-display'), {
  ssr: false,
  loading: () => <MiniMapSkeleton />,
});


const mockDrones = [
  {
    id: 'SKY-ALPHA-001',
    name: 'SkyWatch Alpha',
    status: 'Online',
    flightTime: '47m 12s',
    battery: 82,
    signal: 95, 
    locationName: 'Sector Gamma-7 Perimeter',
    coordinates: [28.6155, 77.2100] as [number, number],
    altitude: '150m',
    speed: '25 km/h',
    videoFeed: 'https://placehold.co/1280x720.png',
    altText: "SkyWatch Alpha drone thermal IR feed",
    aiHint: "aerial surveillance night",
    capabilities: ['4K EO/IR', 'Thermal Imaging', 'Laser Rangefinder'],
    mission: 'Perimeter Surveillance',
    payload: 'FLIR Boson 640+',
  },
  {
    id: 'AERO-BRAVO-002',
    name: 'AeroSentry Bravo',
    status: 'Patrolling',
    flightTime: '1h 15m',
    battery: 65,
    signal: 88,
    locationName: 'Reactor Building Rooftop',
    coordinates: [28.6130, 77.2080] as [number, number],
    altitude: '80m',
    speed: '15 km/h',
    videoFeed: 'https://placehold.co/1280x720.png',
    altText: "AeroSentry Bravo drone HD zoom feed",
    aiHint: "rooftop security camera",
    capabilities: ['HD Video Zoom x50', 'Object Tracking AI', 'Encrypted Uplink'],
    mission: 'High-Value Asset Monitoring',
    payload: 'Sony FCB-EV7520',
  },
  {
    id: 'RECON-CHARLIE-003',
    name: 'ReconCharlie',
    status: 'Charging',
    flightTime: '0m 0s',
    battery: 15,
    signal: 0, 
    locationName: 'Drone Bay Alpha (Dock 3)',
    coordinates: [28.6100, 77.2060] as [number, number], 
    altitude: '0m',
    speed: '0 km/h',
    videoFeed: 'https://placehold.co/1280x720.png',
    altText: "ReconCharlie drone offline charging feed",
    aiHint: "drone charging station",
    capabilities: ['Stealth Mode', 'Long Range Comms', 'Radiation Sensor'],
    mission: 'Rapid Deployment Standby',
    payload: 'Custom SIGINT Package'
  },
];

type Drone = typeof mockDrones[0];

export default function DronesPage() {
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(mockDrones[0]);

  const getStatusBadge = (status: string) => {
    if (status === 'Online' || status === 'Patrolling') return 'bg-green-500/80 text-green-foreground animate-[pulse_2s_ease_in_out_infinite] border-green-400';
    if (status === 'Standby') return 'bg-yellow-500/80 text-yellow-foreground border-yellow-400';
    if (status === 'Charging') return 'bg-blue-500/80 text-blue-foreground border-blue-400';
    return 'bg-red-500/80 text-red-foreground border-red-400';
  };
  
  const getSignalColor = (signalStrength: number) => {
    if (signalStrength > 80) return 'text-green-400';
    if (signalStrength > 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBatteryColor = (batteryLevel: number) => {
    if (batteryLevel > 70) return 'text-green-400';
    if (batteryLevel > 30) return 'text-yellow-400';
    return 'text-red-400 animate-pulse';
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full gap-4 md:gap-6 animate-fadeIn">
        <Card className="shadow-xl border-2 border-primary/30 bg-card/80 backdrop-blur-sm">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2.5 text-primary text-glow-primary">
              <Camera className="h-7 w-7 md:h-8 md:h-8" /> Integrated Drone Surveillance Network
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground/90 mt-1.5">Real-time aerial reconnaissance and situational awareness via automated and manually controlled drone fleet.</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 flex-1 min-h-[calc(100vh-16rem)]">
          <div className="lg:col-span-1 space-y-3.5 overflow-y-auto custom-scrollbar max-h-full pr-1.5 animate-slideUp animation-delay-100">
            {mockDrones.map(drone => (
              <Card
                key={drone.id}
                className={cn(
                  "shadow-lg hover:shadow-glow-primary-md transition-all duration-200 ease-in-out cursor-pointer border-2 bg-card/80 backdrop-blur-sm group",
                  selectedDrone?.id === drone.id ? 'border-primary scale-[1.02] shadow-glow-primary-md ring-2 ring-primary/70' : 'border-border hover:border-primary/60'
                )}
                onClick={() => setSelectedDrone(drone)}
              >
                <CardHeader className="p-3.5 md:p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-md font-semibold text-primary group-hover:text-glow-primary transition-all duration-200">{drone.name}</CardTitle>
                    <Badge variant="outline"
                           className={cn("text-xs px-2 py-0.5 border-opacity-70", getStatusBadge(drone.status))}
                    >
                      {drone.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-muted-foreground/80 pt-1">{drone.mission}</CardDescription>
                </CardHeader>
                <CardContent className="p-3.5 md:p-4 text-xs space-y-2 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><BatteryFull className="h-3.5 w-3.5" /> Batt: <span className={getBatteryColor(drone.battery)}>{drone.battery}%</span></span>
                    <span className="flex items-center gap-1.5"><Wifi className="h-3.5 w-3.5" /> Sig: <span className={getSignalColor(drone.signal)}>{drone.signal}%</span></span>
                  </div>
                   <span className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {drone.locationName}</span>
                   <span className="flex items-center gap-1.5 text-muted-foreground"><Navigation className="h-3.5 w-3.5" /> Alt: {drone.altitude} | Spd: {drone.speed}</span>
                   <span className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Flt Time: {drone.flightTime}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="lg:col-span-2 shadow-xl flex flex-col border-2 border-primary/40 bg-black/60 text-primary-foreground overflow-hidden animate-slideUp animation-delay-200">
            {selectedDrone ? (
              <>
                <CardHeader className="p-3 md:p-4 bg-black/50 backdrop-blur-sm border-b border-primary/30">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg md:text-xl text-primary text-glow-primary">{selectedDrone.name} - Live Operations ({selectedDrone.id})</CardTitle>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-primary/80 hover:text-primary hover:bg-primary/10 rounded-full hover:shadow-glow-primary-sm">
                                <Maximize className="h-5 w-5" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl p-0 border-2 border-primary bg-black cyber-panel">
                           <DialogHeader className="p-3 border-b border-primary/50">
                             <DialogTitle className="text-primary text-glow-primary">{selectedDrone.name} - Fullscreen View</DialogTitle>
                             <DialogDescription className="text-muted-foreground/80 sr-only">Enlarged view of the live video feed and map from {selectedDrone.name}.</DialogDescription>
                           </DialogHeader>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-border">
                             <div className="relative aspect-video bg-black">
                               <Image src={selectedDrone.videoFeed.replace('1280x720', '1920x1080')} alt={selectedDrone.altText} layout="fill" objectFit="cover" data-ai-hint={selectedDrone.aiHint}/>
                             </div>
                             <div className="aspect-video bg-muted/10">
                                <DroneMapDisplay 
                                  key={`${selectedDrone.id}-fullscreen`} 
                                  center={selectedDrone.coordinates} 
                                  droneName={selectedDrone.name}
                                  droneStatus={selectedDrone.status}
                                  droneSignal={selectedDrone.signal}
                                  droneBattery={selectedDrone.battery}
                                />
                             </div>
                           </div>
                        </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-0.5 p-0 bg-border/50">
                  <div className="relative bg-black aspect-video lg:aspect-auto">
                    <Image src={selectedDrone.videoFeed} alt={selectedDrone.altText} layout="fill" objectFit="cover" data-ai-hint={selectedDrone.aiHint} className="animate-fadeIn" priority/>
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 p-2 bg-black/70 backdrop-blur-md rounded text-xs space-y-1 border border-primary/40 shadow-md">
                      <p><span className="font-semibold text-primary/90">ALT:</span> <span className="text-accent font-mono">{selectedDrone.altitude}</span></p>
                      <p><span className="font-semibold text-primary/90">SPD:</span> <span className="text-accent font-mono">{selectedDrone.speed}</span></p>
                      <p className="text-primary/80">FLT: <span className="font-mono">{selectedDrone.flightTime}</span></p>
                    </div>
                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 p-2 bg-black/70 backdrop-blur-md rounded text-xs space-y-1 border border-primary/40 shadow-md text-right">
                      <p className="font-semibold text-primary/90">BATT: <span className={cn("font-mono", getBatteryColor(selectedDrone.battery))}>{selectedDrone.battery}%</span></p>
                      <p className="text-primary/90">SIG: <span className={cn("font-mono", getSignalColor(selectedDrone.signal))}>{selectedDrone.signal}%</span></p>
                    </div>
                  </div>
                  <div className="min-h-[200px] lg:min-h-0 w-full h-full">
                     <DroneMapDisplay 
                        key={selectedDrone.id} 
                        center={selectedDrone.coordinates} 
                        droneName={selectedDrone.name}
                        droneStatus={selectedDrone.status}
                        droneSignal={selectedDrone.signal}
                        droneBattery={selectedDrone.battery}
                      />
                  </div>
                </CardContent>
                <CardFooter className="p-3 md:p-4 bg-black/60 backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-3 border-t border-primary/30">
                    <div className="md:col-span-2 space-y-2">
                         <p className="text-xs text-muted-foreground/80">Capabilities: {selectedDrone.capabilities.join(', ')}</p>
                         <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs flex-1 border-primary/40 text-primary/90 hover:bg-primary/20 hover:text-primary hover:shadow-glow-primary-sm transition-all duration-200">
                                <ZoomIn className="mr-1.5 h-3.5 w-3.5"/> Zoom In
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs flex-1 border-primary/40 text-primary/90 hover:bg-primary/20 hover:text-primary hover:shadow-glow-primary-sm transition-all duration-200">
                                <ZoomOut className="mr-1.5 h-3.5 w-3.5"/> Zoom Out
                            </Button>
                             <Button size="sm" variant="outline" className="text-xs flex-1 border-primary/40 text-primary/90 hover:bg-primary/20 hover:text-primary hover:shadow-glow-primary-sm transition-all duration-200">
                                <Orbit className="mr-1.5 h-3.5 w-3.5"/> Toggle Orbit
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch md:items-end justify-between gap-2">
                        <Button variant="destructive" size="sm" className="w-full text-xs bg-destructive/80 hover:bg-destructive hover:shadow-glow-destructive-md transition-all duration-200" disabled={selectedDrone.status === "Charging"}>
                            <Ban className="mr-1.5 h-3.5 w-3.5"/> Emergency Land
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-xs border-accent/50 text-accent/90 hover:bg-accent/20 hover:text-accent hover:shadow-glow-accent-sm transition-all duration-200">
                            <Zap className="mr-1.5 h-3.5 w-3.5"/> New Mission Task
                        </Button>
                    </div>
                </CardFooter>
              </>
            ) : (
              <CardContent className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-black/30">
                <Camera className="h-20 w-20 sm:h-24 sm:w-24 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground/70">No Drone Selected</h3>
                <p className="text-sm text-muted-foreground/50 max-w-xs">Please select a drone from the list to view its live feed, telemetry, and control options.</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
