
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Zap, Link2, Clock, ListFilter, Search, Sparkles, Share2 } from "lucide-react";
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

// Define types here or import from page if they are shared
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
  confidence: number;
  status: 'new' | 'reviewing' | 'escalated' | 'mitigated';
  summary: string;
  recommendedAction: 'Monitor' | 'Investigate' | 'Escalate' | 'Initiate Protocol';
}

interface AnomalyCorrelationContentProps {
  anomalies: AnomalyEvent[];
  correlatedThreats: CorrelatedThreat[];
  selectedAnomaly: AnomalyEvent | null;
  setSelectedAnomaly: (anomaly: AnomalyEvent | null) => void;
  selectedThreat: CorrelatedThreat | null;
  setSelectedThreat: (threat: CorrelatedThreat | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  severityFilter: string;
  setSeverityFilter: (filter: string) => void;
  filteredAnomalies: AnomalyEvent[];
  getSeverityBadge: (severity: any) => string;
  getActionColor: (action: any) => string;
}

export default function AnomalyCorrelationContent({
  anomalies,
  correlatedThreats,
  selectedAnomaly,
  setSelectedAnomaly,
  selectedThreat,
  setSelectedThreat,
  searchTerm,
  setSearchTerm,
  severityFilter,
  setSeverityFilter,
  filteredAnomalies,
  getSeverityBadge,
  getActionColor
}: AnomalyCorrelationContentProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-4 md:gap-6 min-h-[calc(100vh-20rem)]">
      {/* Anomalies List */}
      <Card className="lg:col-span-1 shadow-lg flex flex-col bg-card/80 backdrop-blur-sm border-border/70 animate-slideUp animation-delay-100">
        <CardHeader className="p-4 border-b border-input">
          <CardTitle className="text-lg flex items-center gap-2 text-primary/90"><ListFilter className="h-5 w-5"/>Anomaly Feed</CardTitle>
          <div className="flex gap-2 mt-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search anomalies..." 
                className="pl-9 h-9 text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[120px] h-9 text-xs">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          <CardContent className="p-3 space-y-2.5">
            {filteredAnomalies.map(anomaly => (
              <div 
                key={anomaly.id} 
                className={cn(
                  "p-3 rounded-md border bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all duration-150",
                  selectedAnomaly?.id === anomaly.id ? "border-primary shadow-glow-primary-sm scale-[1.01]" : "border-input hover:border-primary/40",
                  anomaly.acknowledged ? "opacity-70" : ""
                )}
                onClick={() => setSelectedAnomaly(anomaly)}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs font-semibold text-primary/90">{anomaly.type} <span className="text-muted-foreground font-normal">@ {anomaly.location}</span></p>
                  <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0.5", getSeverityBadge(anomaly.severity))}>{anomaly.severity}</Badge>
                </div>
                <p className="text-xs text-foreground/80 leading-snug mb-1.5">{anomaly.description}</p>
                <div className="flex justify-between items-center text-[10px] text-muted-foreground/70">
                  <span>{anomaly.source}</span>
                  <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5"/>{formatDistanceToNow(anomaly.timestamp, { addSuffix: true })}</span>
                </div>
              </div>
            ))}
             {filteredAnomalies.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No anomalies match your criteria.</p>}
          </CardContent>
        </ScrollArea>
      </Card>

      {/* Correlation & Details View */}
      <Card className="lg:col-span-2 shadow-xl flex flex-col bg-card/80 backdrop-blur-sm border-primary/40 animate-slideUp animation-delay-200">
         <CardHeader className="p-4 border-b border-primary/30">
            <CardTitle className="text-lg flex items-center gap-2 text-primary text-glow-primary">
              <Sparkles className="h-6 w-6"/> AI Correlation & Threat Assessment
            </CardTitle>
          </CardHeader>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 p-1 gap-1">
          <ScrollArea className="md:col-span-2 h-full max-h-[calc(100vh-26rem)] md:max-h-none">
            <div className="p-3 space-y-3">
              <h3 className="text-md font-semibold text-primary/80 px-1">Correlated Threat Events</h3>
              {correlatedThreats.map(threat => (
                <div
                  key={threat.id}
                  className={cn(
                    "p-3.5 rounded-lg border bg-muted/40 hover:bg-muted/60 cursor-pointer transition-all",
                    selectedThreat?.id === threat.id ? "border-accent shadow-glow-accent-sm scale-[1.01]" : "border-input hover:border-accent/50"
                  )}
                  onClick={() => setSelectedThreat(threat)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium text-accent/90">{threat.potentialThreat}</p>
                     <Badge variant="outline" className={cn("text-xs px-2 py-0.5 capitalize", getSeverityBadge(threat.status))}>{threat.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2 mb-1.5">{threat.summary}</p>
                  <div className="flex justify-between items-center text-[11px] text-muted-foreground/70">
                    <span>Confidence: <span className="font-semibold text-accent/80">{(threat.confidence * 100).toFixed(0)}%</span></span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3"/>{formatDistanceToNow(threat.timestamp, { addSuffix: true })}</span>
                  </div>
                </div>
              ))}
              {correlatedThreats.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No correlated threats yet.</p>}
            </div>
          </ScrollArea>

          <div className="md:col-span-3 bg-muted/20 p-4 rounded-md border border-input flex flex-col">
            {selectedThreat ? (
              <ScrollArea className="flex-1">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-accent text-glow-accent mb-1">{selectedThreat.potentialThreat}</h4>
                    <p className="text-xs text-muted-foreground">Generated: {selectedThreat.timestamp.toLocaleString()}</p>
                  </div>
                  
                  <div className="p-3 rounded-md border border-border/50 bg-card/40">
                    <h5 className="text-sm font-semibold text-primary/90 mb-1.5">Summary & Reasoning</h5>
                    <p className="text-xs text-foreground/80 leading-relaxed">{selectedThreat.summary}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-primary/90 mb-1.5">Linked Anomalies ({selectedThreat.linkedAnomalyIds.length})</h5>
                    <ul className="space-y-1.5 text-xs">
                      {selectedThreat.linkedAnomalyIds.map(id => {
                        const linked = anomalies.find(a => a.id === id);
                        return linked ? (
                          <li key={id} className="flex items-center gap-2 p-2 bg-card/50 border border-border rounded-md text-muted-foreground hover:border-primary/30 hover:text-primary/80">
                            <Link2 className="h-3.5 w-3.5 text-primary/70"/> {linked.description} <span className="ml-auto text-[10px] opacity-70">({linked.location})</span>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                    <div className="p-2.5 bg-card/50 border border-border rounded-md">
                        <p className="font-semibold text-primary/80">Confidence</p>
                        <p className="text-xl font-bold text-accent text-glow-accent">{(selectedThreat.confidence * 100).toFixed(0)}%</p>
                    </div>
                    <div className="p-2.5 bg-card/50 border border-border rounded-md">
                        <p className="font-semibold text-primary/80">Status</p>
                        <Badge className={cn("text-sm px-2 py-0.5 capitalize mt-1", getSeverityBadge(selectedThreat.status))}>{selectedThreat.status}</Badge>
                    </div>
                     <div className="p-2.5 bg-card/50 border border-border rounded-md col-span-2">
                        <p className="font-semibold text-primary/80">AI Recommended Action</p>
                        <p className={cn("text-md font-semibold mt-0.5", getActionColor(selectedThreat.recommendedAction))}>{selectedThreat.recommendedAction}</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                <Share2 className="h-12 w-12 mb-3 opacity-30" />
                <p className="font-semibold">Select a Correlated Threat</p>
                <p className="text-xs">Details will be displayed here.</p>
              </div>
            )}
             <CardFooter className="p-0 pt-4 mt-auto">
                <Button className="w-full group bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg hover:shadow-glow-primary-md" disabled={!selectedThreat || selectedThreat.status === 'escalated'}>
                    <Zap className="mr-2 h-4 w-4 group-hover:animate-ping-slow"/> Escalate Selected Threat
                </Button>
             </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}

    