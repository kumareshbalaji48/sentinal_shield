
"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Globe, Layers, Search, CalendarDays, Maximize, Filter, Route, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MapSkeleton } from '@/components/skeletons/map-skeleton';
// Note: L from 'leaflet' is removed as we are not using Leaflet directly for coordinates type anymore.
// We'll use simple [number, number] for coordinates.

const GeoMapDisplay = dynamic(() => import('@/components/features/geo-map-display'), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

const initialThreats = [
  { id: 't1', position: [28.6145, 77.2095] as [number, number], label: 'Anomaly: Sector Gamma Radiation Spike', level: 'high', details: 'Gamma Ray Spectrometer GRS-07 reading 5.2 mSv/hr. Evacuate Sector Gamma.' },
  { id: 't2', position: [28.6128, 77.2108] as [number, number], label: 'Perimeter Breach Alert: West Gate', level: 'critical', details: 'Fence Sensor P-WF-01 and Camera C-WG-03 triggered.' },
  { id: 't3', position: [28.6115, 77.2082] as [number, number], label: 'Maintenance Required: Cooling Unit #3', level: 'medium', details: 'Vibration sensor on Pump CU3-PMP-A exceeds threshold.' },
];

const initialPersonnel = [
  { id: 'p1', position: [28.6140, 77.2090] as [number, number], name: 'Operator Miller', role: 'Reactor Technician', status: 'Active' },
  { id: 'p2', position: [28.6125, 77.2100] as [number, number], name: 'Guard Singh', role: 'Security Patrol Lead', status: 'Active' },
];

export default function GeoMapPage() {
  const [layers, setLayers] = useState({
    sensors: true,
    personnel: true,
    securityZones: true,
    evacuationRoutes: false,
    thermalOverlay: false,
    radiationPlume: false,
  });
  const [timeframe, setTimeframe] = useState([50]); // Representing current time
  const facilityCenter: [number, number] = [28.6139, 77.2090]; // Example: New Delhi area

  const handleLayerChange = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full gap-4 md:gap-6 animate-fadeIn">
        <Card className="shadow-xl border-2 border-primary/30 bg-card/80 backdrop-blur-sm">
          <CardHeader className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl md:text-2xl flex items-center gap-2.5 text-primary text-glow-primary">
                <Globe className="h-7 w-7 md:h-8 md:w-8" /> Geospatial Threat & Asset Console
              </CardTitle>
              <Button variant="outline" size="icon" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:shadow-glow-primary-sm transition-all duration-200">
                <Maximize className="h-5 w-5" />
                <span className="sr-only">Fullscreen Map</span>
              </Button>
            </div>
            <CardDescription className="text-sm text-muted-foreground/90 mt-1.5">Interactive facility map with real-time data overlays for comprehensive situational awareness.</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-4 gap-4 md:gap-6 flex-1 min-h-[calc(100vh-18rem)] md:min-h-0">
          <Card className="lg:col-span-1 shadow-lg flex flex-col h-full bg-card/80 backdrop-blur-sm border-2 border-accent/30 animate-slideUp animation-delay-100">
            <CardHeader className="p-4 md:p-5 border-b border-accent/20">
              <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-accent text-glow-accent"><Layers className="h-5 w-5 md:h-6 md:w-6" />Map Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 flex-1 overflow-y-auto custom-scrollbar p-4 md:p-5">
              <div className="space-y-3">
                <h4 className="font-semibold text-md text-foreground/90">Data Layers:</h4>
                {Object.entries(layers).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3 p-2.5 bg-muted/40 rounded-md hover:bg-muted/60 hover:border-accent/50 border border-transparent transition-all duration-200">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() => handleLayerChange(key as keyof typeof layers)}
                      className="data-[state=checked]:bg-accent data-[state=checked]:border-accent-foreground focus-visible:ring-accent border-primary/50 h-5 w-5"
                    />
                    <Label htmlFor={key} className="text-sm capitalize cursor-pointer flex-1 text-foreground/80 hover:text-foreground transition-colors">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-4">
                <h4 className="font-semibold text-md text-foreground/90 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-accent"/> Timeline View
                </h4>
                <Slider
                  defaultValue={timeframe}
                  onValueChange={setTimeframe}
                  max={100}
                  step={1}
                  className="my-2 [&>span:last-child>span]:bg-accent [&>span:last-child>span]:border-accent-foreground focus-visible:ring-accent [&>span:first-child]:bg-accent/30"
                  aria-label="Timeframe slider"
                />
                <p className="text-xs text-muted-foreground text-center">
                  Simulating data from: <span className="font-semibold text-accent">{timeframe[0] === 50 ? 'Real-time' : `T-${50 - timeframe[0]} hours`}</span>
                </p>
              </div>
              <div className="space-y-3 pt-4">
                <h4 className="font-semibold text-md text-foreground/90 flex items-center gap-2">
                  <Search className="h-5 w-5 text-accent"/> Quick Find
                </h4>
                <Input type="text" placeholder="e.g., Sensor ID, Personnel..." className="h-10 bg-background/70 border-input hover:border-accent/40 focus:border-accent focus:shadow-glow-accent-sm transition-all duration-200"/>
              </div>
            </CardContent>
             <CardFooter className="p-4 md:p-5 border-t border-accent/20">
                <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground shadow-lg hover:shadow-glow-accent-md transition-all duration-300 ease-in-out focus:ring-accent">
                  <Filter className="mr-2 h-4 w-4"/> Apply Filters & Layers
                </Button>
            </CardFooter>
          </Card>

          <Card className="lg:col-span-3 shadow-xl relative overflow-hidden border-2 border-primary/40 bg-muted/10 min-h-[500px] sm:min-h-[600px] lg:min-h-0 animate-slideUp animation-delay-200">
            <CardContent className="p-0 h-full w-full">
              <GeoMapDisplay
                center={facilityCenter}
                zoom={15} // Zoom prop is still passed for context, even if not used by Leaflet
                threats={initialThreats}
                personnel={initialPersonnel}
                layers={layers}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
