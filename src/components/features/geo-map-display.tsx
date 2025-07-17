
"use client";

import React from 'react';
import Image from 'next/image';
import { AlertTriangle, Users, Layers, MapPin, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface GeoMapDisplayProps {
  center: [number, number]; 
  zoom: number; 
  threats: Array<{ id: string; position: [number, number]; label: string; level: 'low' | 'medium' | 'high' | 'critical'; details: string }>;
  personnel: Array<{ id: string; position: [number, number]; name: string; role: string; status: string }>;
  layers: {
    sensors: boolean;
    personnel: boolean;
    securityZones: boolean;
    evacuationRoutes: boolean;
    thermalOverlay: boolean;
    radiationPlume: boolean;
  };
  className?: string;
}

export default function GeoMapDisplay({ center, threats, personnel, layers, className }: GeoMapDisplayProps) {
  const getThreatBadgeVariant = (level: string) => {
    switch (level) {
      case 'critical': return 'destructive';
      case 'high': return {className: "bg-orange-500 text-orange-foreground hover:bg-orange-600 shadow-glow-accent-sm" };
      case 'medium': return { className: "bg-yellow-500 text-black hover:bg-yellow-600 shadow-glow-accent-sm"};
      default: return 'secondary';
    }
  };

  const activeLayers = Object.entries(layers)
    .filter(([, isActive]) => isActive)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim());

  return (
    <div className={cn("w-full h-full grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-muted/10 rounded-md", className)}>
      <div className="md:col-span-2 relative w-full h-full min-h-[300px] md:min-h-full rounded-md overflow-hidden shadow-lg border border-primary/30">
        <Image
          src="https://placehold.co/800x600.png"
          alt="Geospatial Overview Placeholder"
          layout="fill"
          objectFit="cover"
          data-ai-hint="map overview facility"
          className="opacity-70"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center p-4">
            <MapPin className="h-16 w-16 text-primary/70 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold text-primary text-glow-primary">Facility Overview</h3>
            <p className="text-muted-foreground text-sm">
              Location: Lat {center[0].toFixed(4)}, Lon {center[1].toFixed(4)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-1 space-y-4 py-2 pr-1">
        <div className="cyber-panel p-3 rounded-lg">
          <h4 className="text-md font-semibold text-primary/90 mb-2 flex items-center gap-2">
            <Layers className="h-5 w-5" /> Active Data Layers
          </h4>
          {activeLayers.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {activeLayers.map(layer => (
                <Badge key={layer} variant="outline" className="text-xs capitalize border-accent/70 text-accent/90 bg-accent/10">
                  {layer}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">No layers active.</p>
          )}
        </div>

        <div className="cyber-panel p-3 rounded-lg">
          <h4 className="text-md font-semibold text-destructive/90 mb-2 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" /> Active Threats ({threats.length})
          </h4>
          {threats.length > 0 ? (
            <ScrollArea className="h-[150px] custom-scrollbar pr-2">
              <ul className="space-y-2 text-xs">
                {threats.map(threat => (
                  <li key={threat.id} className="p-2 bg-card/50 border border-border rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground/90">{threat.label}</span>
                      <Badge variant={getThreatBadgeVariant(threat.level) as any} className="text-[10px] px-1.5 py-0.5 capitalize">{threat.level}</Badge>
                    </div>
                    <p className="text-muted-foreground text-[11px] line-clamp-2">{threat.details}</p>
                    <p className="text-muted-foreground/70 text-[10px]">Location: Approx. {threat.position[0].toFixed(3)}, {threat.position[1].toFixed(3)}</p>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p className="text-xs text-muted-foreground italic">No active threats reported.</p>
          )}
        </div>

        <div className="cyber-panel p-3 rounded-lg">
          <h4 className="text-md font-semibold text-accent/90 mb-2 flex items-center gap-2">
            <Users className="h-5 w-5" /> Personnel Overview ({personnel.length})
          </h4>
          {personnel.length > 0 ? (
            <ScrollArea className="h-[100px] custom-scrollbar pr-2">
            <ul className="space-y-1.5 text-xs">
              {personnel.map(p => (
                <li key={p.id} className="flex justify-between items-center p-1.5 bg-card/40 border-b border-border/50">
                  <div>
                    <span className="font-medium text-foreground/80">{p.name}</span>
                    <span className="text-muted-foreground text-[11px]"> ({p.role})</span>
                  </div>
                  <Badge variant={p.status === 'Active' ? 'default' : 'secondary'} className={cn("text-[10px] px-1.5 py-0.5", p.status === 'Active' ? 'bg-green-500/70 border-green-600' : '')}>
                    {p.status}
                  </Badge>
                </li>
              ))}
            </ul>
            </ScrollArea>
          ) : (
             <p className="text-xs text-muted-foreground italic">No personnel data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
