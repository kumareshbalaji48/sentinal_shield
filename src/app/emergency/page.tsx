
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Siren } from "lucide-react";

const EmergencyResponseContent = dynamic(() => import('@/components/features/emergency-response-content'), {
  ssr: false,
  loading: () => <div className="grid lg:grid-cols-3 gap-4 md:gap-6 min-h-[calc(100vh-20rem)]">
    <Card className="lg:col-span-1"><CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent><Skeleton className="h-60 w-full" /></CardContent></Card>
    <Card className="lg:col-span-2"><CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader><CardContent><Skeleton className="h-60 w-full" /></CardContent></Card>
  </div>,
});


export interface EmergencyIncident {
  id: string;
  type: 'Radiological Leak' | 'Major Fire' | 'Security Breach LV3' | 'System Malfunction - Critical' | 'Structural Integrity Failure';
  location: string;
  status: 'active' | 'contained' | 'mitigating' | 'resolved' | 'standby';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startTime: Date;
  assignedTeams: string[];
  description: string;
  progress: number; // 0-100
}

export interface ResponseTeam {
  id: string;
  name: string;
  type: 'Security Patrol' | 'HAZMAT Unit' | 'Medical Response' | 'Engineering & Maintenance' | 'Command & Control';
  status: 'available' | 'deployed' | 'standby' | 'off-duty';
  personnelCount: number;
  currentTask?: string;
  location?: string;
  eta?: string;
}

export interface ActionLogItem {
  id: string;
  timestamp: Date;
  action: string;
  actor: string; // User or System
  status: 'completed' | 'pending' | 'failed';
}

const initialIncidents: EmergencyIncident[] = [
  { id: 'inc_001', type: 'Radiological Leak', location: 'Sector Gamma-7 Storage', status: 'active', priority: 'critical', startTime: new Date(Date.now() - 1000 * 60 * 15), assignedTeams: ['hazmat_alpha', 'med_bravo'], description: 'Confirmed Alpha particle leakage from container S-G7-C012. Area lockdown initiated.', progress: 25 },
  { id: 'inc_002', type: 'Security Breach LV3', location: 'Perimeter Fence - West Gate', status: 'mitigating', priority: 'high', startTime: new Date(Date.now() - 1000 * 60 * 45), assignedTeams: ['sec_delta', 'sec_echo', 'cmd_main'], description: 'Unauthorized drone detected and neutralized. Perimeter sweep ongoing for ground intrusion.', progress: 70 },
];

const initialTeams: ResponseTeam[] = [
  { id: 'sec_delta', name: 'Security Team Delta', type: 'Security Patrol', status: 'deployed', personnelCount: 8, currentTask: 'Perimeter Sweep West Gate', location: 'West Perimeter', eta: 'On Site'},
  { id: 'sec_echo', name: 'Security Team Echo', type: 'Security Patrol', status: 'deployed', personnelCount: 6, currentTask: 'Reinforce West Gate CP', location: 'West Gate CP', eta: 'On Site'},
  { id: 'hazmat_alpha', name: 'HAZMAT Unit Alpha', type: 'HAZMAT Unit', status: 'deployed', personnelCount: 12, currentTask: 'Containment at Gamma-7 Storage', location: 'Sector Gamma-7', eta: 'On Site'},
  { id: 'med_bravo', name: 'Medical Team Bravo', type: 'Medical Response', status: 'deployed', personnelCount: 4, currentTask: 'Triage Setup Gamma-7 Staging', location: 'Gamma-7 Staging Area', eta: '2 min'},
  { id: 'eng_charli', name: 'Engineering Charlie', type: 'Engineering & Maintenance', status: 'standby', personnelCount: 5, location: 'Central Workshop'},
  { id: 'cmd_main', name: 'Command & Control', type: 'Command & Control', status: 'active', personnelCount: 3, location: 'Main Control Room'},
];

const initialActionLog: ActionLogItem[] = [
    {id: 'log_005', timestamp: new Date(Date.now() - 1000 * 60 * 2), action: 'HAZMAT Alpha dispatched to Gamma-7.', actor: 'System (Auto-Dispatch)', status: 'completed'},
    {id: 'log_004', timestamp: new Date(Date.now() - 1000 * 60 * 5), action: 'Incident INC_001 (Radiological Leak) escalated to CRITICAL.', actor: 'Operator Miller', status: 'completed'},
    {id: 'log_003', timestamp: new Date(Date.now() - 1000 * 60 * 10), action: 'Perimeter lockdown protocol initiated for West Sector.', actor: 'System (Auto-Response)', status: 'completed'},
    {id: 'log_002', timestamp: new Date(Date.now() - 1000 * 60 * 15), action: 'Security Team Delta deployed to West Gate.', actor: 'Commander Eva Rostova', status: 'completed'},
    {id: 'log_001', timestamp: new Date(Date.now() - 1000 * 60 * 20), action: 'Alert: INC_002 Security Breach initiated.', actor: 'System', status: 'completed'},
];


export default function EmergencyResponsePage() {
  const [incidents, setIncidents] = useState<EmergencyIncident[]>(initialIncidents);
  const [teams, setTeams] = useState<ResponseTeam[]>(initialTeams);
  const [actionLog, setActionLog] = useState<ActionLogItem[]>(initialActionLog);
  const [selectedIncident, setSelectedIncident] = useState<EmergencyIncident | null>(initialIncidents[0] || null);

  return (
    <MainLayout>
      <div className="space-y-6 md:space-y-8 animate-fadeIn">
        <Card className="shadow-xl border-2 border-destructive/40 bg-card/80 backdrop-blur-sm">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2.5 text-destructive text-glow-destructive">
              <Siren className="h-7 w-7 md:h-8 md:h-8 animate-pulse" /> Emergency Response Coordination Console
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground/90 mt-1.5">
              Centralized command for managing critical incidents, resource dispatch, and real-time operational response.
            </CardDescription>
          </CardHeader>
        </Card>

        <EmergencyResponseContent
            incidents={incidents}
            teams={teams}
            actionLog={actionLog}
            selectedIncident={selectedIncident}
            setSelectedIncident={setSelectedIncident}
        />

      </div>
    </MainLayout>
  );
}

    