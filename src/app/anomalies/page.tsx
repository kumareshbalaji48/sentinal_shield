
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BrainCircuit, Zap, Link2, AlertTriangle, CheckCircle, Clock, Filter, Eye, Share2, ListFilter, Search, Sparkles, Users, MapPin, ClipboardCheck, Siren } from "lucide-react";
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import AnomalyCorrelationPageLoading from './loading';

const AnomalyCorrelationContent = dynamic(() => import('@/components/features/anomaly-correlation-content'), {
  ssr: false,
  loading: () => <div className="grid lg:grid-cols-3 gap-4 md:gap-6 min-h-[calc(100vh-20rem)]">
    <Card className="lg:col-span-1"><CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent><Skeleton className="h-40 w-full" /></CardContent></Card>
    <Card className="lg:col-span-2"><CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader><CardContent><Skeleton className="h-40 w-full" /></CardContent></Card>
  </div>,
});


interface AnomalyEvent {
  id: string;
  timestamp: Date;
  source: 'Sensor Array' | 'Drone Patrol' | 'Network IDS' | 'Intel Feed' | 'Facility AI';
  type: 'Offline' | 'Critical Value Spike' | 'Intrusion Detected' | 'Unusual Activity Pattern' | 'Object Sighted' | 'System Anomaly';
  description: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  acknowledged: boolean;
  data?: Record<string, string | number>;
}

interface CorrelatedThreat {
  id: string;
  timestamp: Date;
  linkedAnomalyIds: string[];
  potentialThreat: string;
  confidence: number; // 0-1
  status: 'new' | 'reviewing' | 'escalated' | 'mitigated';
  summary: string;
  recommendedAction: 'Monitor' | 'Investigate' | 'Escalate' | 'Initiate Protocol';
}

const initialAnomalies: AnomalyEvent[] = [
  { id: 'anomaly_001', timestamp: new Date(Date.now() - 1000 * 60 * 2), source: 'Sensor Array', type: 'Critical Value Spike', description: 'Reactor Core Temp reading 345°C (Threshold: 330°C)', location: 'Sector Alpha-1 Reactor Core', severity: 'high', acknowledged: false, data: { sensorId: 'RCT-A1-001', value: '345°C', threshold: '330°C' } },
  { id: 'anomaly_002', timestamp: new Date(Date.now() - 1000 * 60 * 5), source: 'Network IDS', type: 'Intrusion Detected', description: 'Multiple failed login attempts on ICS controller from unauthorized IP 192.168.5.102.', location: 'Control Network Segment B', severity: 'medium', acknowledged: true, data: { target: 'ICS-B-CTRL-04', sourceIP: '192.168.5.102', attempts: 12 } },
  { id: 'anomaly_003', timestamp: new Date(Date.now() - 1000 * 60 * 10), source: 'Drone Patrol', type: 'Object Sighted', description: 'Unidentified aerial vehicle detected near West Perimeter, altitude 200m.', location: 'West Perimeter Zone 3', severity: 'high', acknowledged: false, data: { droneId: 'SKY-RHO-007', objectSignature: 'UAV-Generic-Small' } },
  { id: 'anomaly_004', timestamp: new Date(Date.now() - 1000 * 60 * 12), source: 'Facility AI', type: 'Unusual Activity Pattern', description: 'Anomalous energy consumption pattern in Sector Gamma-3. Spike of 25% over baseline.', location: 'Sector Gamma-3 Substation', severity: 'medium', acknowledged: false, data: { baseline: '500kW', current: '625kW'} },
  { id: 'anomaly_005', timestamp: new Date(Date.now() - 1000 * 60 * 20), source: 'Intel Feed', type: 'System Anomaly', description: 'OSINT chatter indicates potential exploit for ICS firmware v2.1 (currently deployed).', location: 'System-Wide', severity: 'medium', acknowledged: true, data: { firmware: 'v2.1', source: 'DarkWebIntel-XYZ' } },
];

const initialCorrelatedThreats: CorrelatedThreat[] = [
   { id: 'corr_001', timestamp: new Date(Date.now() - 1000 * 60 * 1), linkedAnomalyIds: ['anomaly_001', 'anomaly_004'], potentialThreat: 'Potential Overload or Sabotage in Sector Alpha/Gamma', confidence: 0.75, status: 'new', summary: 'Elevated reactor core temperature combined with unusual energy consumption in a nearby sector suggests a cascading failure or a coordinated stress event.', recommendedAction: 'Investigate' },
];

export default function AnomalyCorrelationPage() {
  const [anomalies, setAnomalies] = useState<AnomalyEvent[]>(initialAnomalies);
  const [correlatedThreats, setCorrelatedThreats] = useState<CorrelatedThreat[]>(initialCorrelatedThreats);
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyEvent | null>(null);
  const [selectedThreat, setSelectedThreat] = useState<CorrelatedThreat | null>(initialCorrelatedThreats[0] || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  useEffect(() => {
    const interval = setInterval(() => {
      const newAnomaly: AnomalyEvent = {
        id: `anomaly_${Date.now()}`,
        timestamp: new Date(),
        source: (['Sensor Array', 'Drone Patrol', 'Network IDS', 'Intel Feed', 'Facility AI'] as AnomalyEvent['source'])[Math.floor(Math.random() * 5)],
        type: (['Offline', 'Critical Value Spike', 'Intrusion Detected', 'Unusual Activity Pattern', 'Object Sighted', 'System Anomaly'] as AnomalyEvent['type'])[Math.floor(Math.random() * 6)],
        description: `Mock event: ${Math.random().toString(36).substring(7)} at facility point ${Math.floor(Math.random()*10)}`,
        location: `Sector ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}-${Math.floor(Math.random() * 3) + 1}`,
        severity: (['low', 'medium', 'high', 'critical'] as AnomalyEvent['severity'])[Math.floor(Math.random() * 4)],
        acknowledged: false
      };
      setAnomalies(prev => [newAnomaly, ...prev.slice(0, 19)]);
    }, 7000 + Math.random() * 3000); // Add new anomaly every 7-10 seconds
    return () => clearInterval(interval);
  }, []);

  const filteredAnomalies = useMemo(() => {
    return anomalies.filter(anomaly => 
      (anomaly.description.toLowerCase().includes(searchTerm.toLowerCase()) || anomaly.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (severityFilter === 'all' || anomaly.severity === severityFilter)
    );
  }, [anomalies, searchTerm, severityFilter]);

  const getSeverityBadge = (severity: AnomalyEvent['severity'] | CorrelatedThreat['status']) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-red-foreground animate-pulse shadow-glow-destructive-md';
      case 'high': case 'escalated': return 'bg-orange-500 text-orange-foreground shadow-glow-accent-md';
      case 'medium': case 'reviewing': return 'bg-yellow-500 text-black shadow-glow-accent-sm';
      case 'low': case 'new': return 'bg-blue-500 text-blue-foreground';
      case 'mitigated': return 'bg-green-500 text-green-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  const getActionColor = (action: CorrelatedThreat['recommendedAction']) => {
    if (action === 'Escalate' || action === 'Initiate Protocol') return 'text-red-400';
    if (action === 'Investigate') return 'text-yellow-400';
    return 'text-primary';
  };

  return (
    <MainLayout>
      <div className="space-y-6 md:space-y-8 animate-fadeIn">
        <Card className="shadow-xl border-2 border-primary/30 bg-card/80 backdrop-blur-sm">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2.5 text-primary text-glow-primary">
              <BrainCircuit className="h-7 w-7 md:h-8 md:h-8" /> Sentinel AI: Anomaly Correlation Engine
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground/90 mt-1.5">
              Real-time ingestion and AI-driven correlation of disparate anomaly events to identify emergent threats and complex incident patterns.
            </CardDescription>
          </CardHeader>
        </Card>

        <AnomalyCorrelationContent 
          anomalies={anomalies}
          correlatedThreats={correlatedThreats}
          selectedAnomaly={selectedAnomaly}
          setSelectedAnomaly={setSelectedAnomaly}
          selectedThreat={selectedThreat}
          setSelectedThreat={setSelectedThreat}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          filteredAnomalies={filteredAnomalies}
          getSeverityBadge={getSeverityBadge}
          getActionColor={getActionColor}
        />
      </div>
    </MainLayout>
  );
}

    