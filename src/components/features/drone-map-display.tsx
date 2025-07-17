
"use client";

import React from 'react';
import Image from 'next/image';
import { Navigation, MapPin, Wifi, BatteryCharging, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge'; 

interface DroneMapDisplayProps {
  center: [number, number]; 
  zoom?: number; 
  droneName: string;
  flightPath?: [number, number][]; 
  className?: string;
  droneStatus?: string; 
  droneSignal?: number; 
  droneBattery?: number; 
}

export default function DroneMapDisplay({
  center,
  droneName,
  className,
  droneStatus = "Unknown",
  droneSignal,
  droneBattery
}: DroneMapDisplayProps) {

  const getStatusColor = () => {
    if (droneStatus.toLowerCase() === 'online' || droneStatus.toLowerCase() === 'patrolling') return 'bg-green-500/80 text-green-foreground border-green-400';
    if (droneStatus.toLowerCase() === 'charging') return 'bg-blue-500/80 text-blue-foreground border-blue-400';
    if (droneStatus.toLowerCase() === 'offline' || droneStatus.toLowerCase() === 'error') return 'bg-red-500/80 text-red-foreground border-red-400';
    return 'bg-yellow-500/80 text-yellow-foreground border-yellow-400'; 
  };
  
  const getSignalColor = (signal?: number) => {
    if (signal === undefined) return 'text-muted-foreground';
    if (signal > 80) return 'text-green-400';
    if (signal > 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBatteryColor = (battery?: number) => {
     if (battery === undefined) return 'text-muted-foreground';
    if (battery > 70) return 'text-green-400';
    if (battery > 30) return 'text-yellow-400';
    return 'text-red-400';
  };


  return (
    <div className={cn("w-full h-full relative bg-black rounded-md overflow-hidden border border-primary/30 shadow-lg", className)}>
      <Image
        src="https://placehold.co/600x400.png"
        alt={`${droneName} map view placeholder`}
        layout="fill"
        objectFit="cover"
        data-ai-hint="drone aerial map"
        className="opacity-50 group-hover:opacity-70 transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-primary text-glow-primary">{droneName}</h3>
          <Badge className={cn("text-xs capitalize", getStatusColor())}>{droneStatus}</Badge>
        </div>
        
        <div className="bg-black/60 backdrop-blur-sm p-2.5 rounded-md border border-primary/20 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-primary/90">
            <MapPin className="h-3.5 w-3.5" />
            <span>Coords: {center[0].toFixed(4)}, {center[1].toFixed(4)}</span>
          </div>
          {droneSignal !== undefined && (
            <div className="flex items-center gap-1.5">
              <Wifi className={cn("h-3.5 w-3.5", getSignalColor(droneSignal))} />
              <span>Signal: <span className={cn(getSignalColor(droneSignal), "font-semibold")}>{droneSignal}%</span></span>
            </div>
          )}
           {droneBattery !== undefined && (
            <div className="flex items-center gap-1.5">
              <BatteryCharging className={cn("h-3.5 w-3.5", getBatteryColor(droneBattery))} />
              <span>Battery: <span className={cn(getBatteryColor(droneBattery), "font-semibold")}>{droneBattery}%</span></span>
            </div>
          )}
          {droneStatus.toLowerCase() === 'error' && (
             <div className="flex items-center gap-1.5 text-red-400">
                <AlertTriangle className="h-3.5 w-3.5"/>
                <span>System Alert Active</span>
            </div>
          )}
        </div>
      </div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
         <Navigation className="h-24 w-24 text-primary/50 transform -rotate-45" />
       </div>
    </div>
  );
}
