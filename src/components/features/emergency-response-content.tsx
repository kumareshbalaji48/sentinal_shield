
"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Siren, Users, MapPin, ClipboardCheck, MessageSquare, Bell, ChevronsUpDown, RadioTower, AlertCircle, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { cn } from '@/lib/utils';
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import type { EmergencyIncident, ResponseTeam, ActionLogItem } from '@/app/emergency/page';

interface EmergencyResponseContentProps {
    incidents: EmergencyIncident[];
    teams: ResponseTeam[];
    actionLog: ActionLogItem[];
    selectedIncident: EmergencyIncident | null;
    setSelectedIncident: (incident: EmergencyIncident | null) => void;
}

export default function EmergencyResponseContent({
    incidents,
    teams,
    actionLog,
    selectedIncident,
    setSelectedIncident
}: EmergencyResponseContentProps) {

  const getPriorityBadge = (priority: EmergencyIncident['priority']) => {
    if (priority === "critical") return "bg-red-600 text-red-foreground animate-pulse shadow-glow-destructive-md";
    if (priority === "high") return "bg-orange-500 text-orange-foreground shadow-glow-accent-md";
    if (priority === "medium") return "bg-yellow-500 text-black shadow-glow-accent-sm";
    return "bg-blue-500 text-blue-foreground";
  };

  const getStatusColor = (status: ResponseTeam['status'] | EmergencyIncident['status']) => {
    if (status === "active" || status === "deployed") return "text-green-400";
    if (status === "contained" || status === "mitigating" || status === "standby") return "text-yellow-400";
    if (status === "resolved") return "text-blue-400";
    return "text-muted-foreground";
  };
    
    return (
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 min-h-[calc(100vh-20rem)]">
          {/* Incidents List */}
          <Card className="lg:col-span-1 shadow-lg flex flex-col bg-card/80 backdrop-blur-sm border-border/70 animate-slideUp animation-delay-100">
            <CardHeader className="p-4 border-b border-destructive/20">
              <CardTitle className="text-lg flex items-center gap-2 text-destructive/90"><Bell className="h-5 w-5"/>Active Incidents ({incidents.filter(inc => inc.status !== 'resolved').length})</CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1">
              <CardContent className="p-3 space-y-2.5">
                {incidents.map(incident => (
                  <div 
                    key={incident.id} 
                    className={cn(
                      "p-3.5 rounded-lg border bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all duration-150 group",
                      selectedIncident?.id === incident.id ? "border-destructive shadow-glow-destructive-sm scale-[1.01]" : "border-input hover:border-destructive/40"
                    )}
                    onClick={() => setSelectedIncident(incident)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-semibold text-destructive/90 group-hover:text-destructive transition-colors">{incident.type}</p>
                      <Badge variant="outline" className={cn("text-xs px-2 py-0.5", getPriorityBadge(incident.priority))}>{incident.priority}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground/80 mb-0.5"><MapPin className="inline h-3 w-3 mr-1"/>{incident.location}</p>
                    <p className={cn("text-xs font-medium capitalize", getStatusColor(incident.status))}>Status: {incident.status}</p>
                    <Progress value={incident.progress} className="h-1.5 mt-1.5" indicatorClassName={cn(getPriorityBadge(incident.priority))} />
                    <p className="text-[10px] text-muted-foreground/70 mt-1">Opened: {formatDistanceToNowStrict(incident.startTime, { addSuffix: true })}</p>
                  </div>
                ))}
                {incidents.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No active incidents.</p>}
              </CardContent>
            </ScrollArea>
            <CardFooter className="p-3 border-t border-destructive/20">
                <Button variant="destructive" className="w-full shadow-md hover:shadow-glow-destructive-md">
                    <Siren className="mr-2 h-4 w-4"/> Declare New Critical Incident
                </Button>
            </CardFooter>
          </Card>

          {/* Incident Details & Map */}
          <Card className="lg:col-span-2 shadow-xl flex flex-col bg-card/80 backdrop-blur-sm border-destructive/50 animate-slideUp animation-delay-200">
            {selectedIncident ? (
            <>
              <CardHeader className="p-4 border-b border-destructive/30">
                <CardTitle className="text-lg flex items-center gap-2 text-destructive text-glow-destructive">
                    <AlertTriangle className="h-6 w-6"/> {selectedIncident.type} - Details
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">{selectedIncident.location} | Priority: <span className={cn("font-semibold", (getPriorityBadge(selectedIncident.priority) as any)?.className?.split(' ')[0] || 'text-destructive')}>{selectedIncident.priority.toUpperCase()}</span></CardDescription>
              </CardHeader>
              <CardContent className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 overflow-y-auto custom-scrollbar">
                <div className="space-y-3">
                    <div className="p-3 rounded-md border border-border/50 bg-card/40">
                        <h4 className="text-sm font-semibold text-primary/90 mb-1">Incident Description</h4>
                        <p className="text-xs text-foreground/80 leading-relaxed">{selectedIncident.description}</p>
                    </div>
                    <div className="p-3 rounded-md border border-border/50 bg-card/40">
                        <h4 className="text-sm font-semibold text-primary/90 mb-1.5">Response Progress</h4>
                        <div className="flex items-center gap-2">
                            <Progress value={selectedIncident.progress} className="h-2.5 flex-1" indicatorClassName={cn(getPriorityBadge(selectedIncident.priority))} />
                            <span className="text-sm font-bold text-primary">{selectedIncident.progress}%</span>
                        </div>
                    </div>
                     <div className="p-3 rounded-md border border-border/50 bg-card/40">
                        <h4 className="text-sm font-semibold text-primary/90 mb-1.5 flex items-center gap-1.5"><RadioTower className="h-4 w-4"/>Key Actions</h4>
                        <div className="space-y-1.5 text-xs">
                            <Button size="sm" variant="outline" className="w-full justify-start text-left h-auto py-1.5 border-accent/40 text-accent/90 hover:bg-accent/20 hover:text-accent">
                                <Users className="mr-2 h-3.5 w-3.5"/> Assign/Reassign Teams
                            </Button>
                            <Button size="sm" variant="outline" className="w-full justify-start text-left h-auto py-1.5 border-accent/40 text-accent/90 hover:bg-accent/20 hover:text-accent">
                               <MessageSquare className="mr-2 h-3.5 w-3.5"/> Send Secure Broadcast
                            </Button>
                            <Button size="sm" variant="outline" className="w-full justify-start text-left h-auto py-1.5 border-accent/40 text-accent/90 hover:bg-accent/20 hover:text-accent">
                               <ClipboardCheck className="mr-2 h-3.5 w-3.5"/> Update Incident Log
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="bg-muted/20 rounded-md border border-input min-h-[250px] md:min-h-full flex items-center justify-center relative overflow-hidden group">
                     <Image src="https://placehold.co/800x600.png" alt="Emergency Map Placeholder" layout="fill" objectFit="cover" className="opacity-40 group-hover:opacity-60 transition-opacity" data-ai-hint="map emergency"/>
                    <p className="z-10 text-lg font-semibold text-destructive/70 text-glow-destructive">Mockup: Live Incident Map</p>
                </div>
              </CardContent>
               <CardFooter className="p-3 border-t border-destructive/30">
                <Button variant="outline" className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10 hover:text-green-300 hover:shadow-glow-primary-sm" disabled={selectedIncident.status === 'resolved'}>
                    <CheckCircle2 className="mr-2 h-4 w-4"/> Mark as Resolved
                </Button>
            </CardFooter>
            </>
            ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                    <AlertCircle className="h-16 w-16 mb-4 opacity-30" />
                    <p className="font-semibold">Select an Incident</p>
                    <p className="text-sm">Details and actions will appear here.</p>
                  </div>
            )}
          </Card>

          {/* Teams & Action Log */}
          <Card className="lg:col-span-3 shadow-lg bg-card/80 backdrop-blur-sm border-border/70 animate-slideUp animation-delay-300">
             <CardHeader className="p-4 border-b border-input">
                <CardTitle className="text-lg flex items-center gap-2 text-primary/90"><ChevronsUpDown className="h-5 w-5"/>Response Teams & Action Log</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-0 md:gap-px md:bg-border/50 h-[calc(100vh-26rem)] md:h-auto md:max-h-[600px]">
                <ScrollArea className="md:h-full md:max-h-[calc(600px-3.5rem)] bg-card">
                  <div className="p-3">
                  <h4 className="text-md font-semibold text-primary/80 mb-2 px-1">Team Status</h4>
                  <Table className="text-xs">
                    <TableHeader>
                      <TableRow className="border-b-input/70">
                        <TableHead className="h-8 px-2 text-primary/70">Team</TableHead>
                        <TableHead className="h-8 px-2 text-primary/70">Type</TableHead>
                        <TableHead className="h-8 px-2 text-primary/70 text-center">Status</TableHead>
                        <TableHead className="h-8 px-2 text-primary/70 text-right">Personnel</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teams.map(team => (
                        <TableRow key={team.id} className="border-b-input/50 hover:bg-muted/40">
                          <TableCell className="font-medium px-2 py-2 text-foreground/90">{team.name}</TableCell>
                          <TableCell className="px-2 py-2 text-muted-foreground">{team.type}</TableCell>
                          <TableCell className="px-2 py-2 text-center">
                            <Badge variant={team.status === 'deployed' ? 'destructive' : team.status === 'available' ? 'default' : 'secondary'} 
                                   className={cn("text-[10px] px-1.5 py-0.5 capitalize", team.status === 'deployed' ? 'bg-orange-500/70 text-orange-foreground border-orange-500' : team.status === 'available' ? 'bg-green-500/70 text-green-foreground border-green-500' : 'border-muted-foreground/50')}>
                                {team.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-2 py-2 text-right text-foreground/90 font-medium">{team.personnelCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </div>
                </ScrollArea>
                <ScrollArea className="md:h-full md:max-h-[calc(600px-3.5rem)] bg-card">
                   <div className="p-3">
                    <h4 className="text-md font-semibold text-primary/80 mb-2 px-1">Action Log</h4>
                    <div className="space-y-2.5">
                      {actionLog.map(log => (
                        <div key={log.id} className="p-2.5 bg-muted/30 border border-input rounded-md text-xs">
                          <p className="text-foreground/85 leading-snug">{log.action}</p>
                          <div className="flex justify-between items-center text-[10px] text-muted-foreground/70 mt-1">
                            <span>By: {log.actor}</span>
                            <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5"/>{formatDistanceToNow(log.timestamp, { addSuffix: true })}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                   </div>
                </ScrollArea>
              </CardContent>
          </Card>
        </div>
    );
}

    