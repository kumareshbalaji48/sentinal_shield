
"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, ShieldCheck, ShieldQuestion, AlertTriangleIcon, CheckCircle2, Biohazard, Radiation, FlaskConical, Activity, ServerCrash, Flame, Sigma } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ThreatLevel = "low" | "medium" | "high" | "critical" | "unknown";

interface AlertCardProps {
  threatLevel: ThreatLevel;
  alerts: string[];
  lastUpdated: string;
}

const getThreatIcon = (level: ThreatLevel): ReactNode => {
  switch (level) {
    case "low":
      return <ShieldCheck className="h-8 w-8" />;
    case "medium":
      return <ShieldAlert className="h-8 w-8" />;
    case "high":
      return <AlertTriangleIcon className="h-8 w-8" />; 
    case "critical":
      return <Biohazard className="h-8 w-8 animate-[pulse_1.5s_ease-in-out_infinite]" />; 
    default:
      return <ShieldQuestion className="h-8 w-8" />;
  }
};

const threatLevelConfig: Record<ThreatLevel, { icon: ReactNode; colorClass: string; label: string; bgColorClass?: string; borderColorClass?: string; glowClass?: string }> = {
  low: { icon: getThreatIcon("low"), colorClass: "text-green-400", label: "Low", bgColorClass: "bg-green-600/20", borderColorClass:"border-green-500/60", glowClass: "shadow-glow-primary-sm" },
  medium: { icon: getThreatIcon("medium"), colorClass: "text-yellow-400", label: "Medium", bgColorClass: "bg-yellow-500/20", borderColorClass:"border-yellow-500/60", glowClass: "shadow-glow-accent-sm" }, // Using accent for medium for variety
  high: { icon: getThreatIcon("high"), colorClass: "text-orange-400", label: "High", bgColorClass: "bg-orange-500/20", borderColorClass:"border-orange-500/60", glowClass: "shadow-glow-accent-md" }, // Using accent for high for variety
  critical: { icon: getThreatIcon("critical"), colorClass: "text-red-400", label: "Critical", bgColorClass: "bg-red-600/30 animate-pulse-border-bg", borderColorClass:"border-red-500/80 animate-pulse-border", glowClass: "shadow-glow-destructive-lg" }, // Stronger glow for critical
  unknown: { icon: getThreatIcon("unknown"), colorClass: "text-muted-foreground", label: "Unknown", bgColorClass: "bg-muted/30", borderColorClass:"border-muted/40"},
};

const getAlertIcon = (alertText: string): ReactNode => {
  const lowerAlert = alertText.toLowerCase();
  if (lowerAlert.includes("radiation") || lowerAlert.includes("radiological") || lowerAlert.includes("gamma")) {
    return <Radiation className="h-5 w-5 flex-shrink-0 text-yellow-400 mt-0.5 animate-pulse-slow" />;
  }
  if (lowerAlert.includes("chemical") || lowerAlert.includes("spill") || lowerAlert.includes("gas") || lowerAlert.includes("particulate")) {
    return <FlaskConical className="h-5 w-5 flex-shrink-0 text-lime-400 mt-0.5" />;
  }
  if (lowerAlert.includes("biohazard") || lowerAlert.includes("biological")) {
    return <Biohazard className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5 animate-ping-slow" />;
  }
  if (lowerAlert.includes("network") || lowerAlert.includes("server") || lowerAlert.includes("cyber") || lowerAlert.includes("ip") || lowerAlert.includes("data exfiltration")) {
    return <ServerCrash className="h-5 w-5 flex-shrink-0 text-accent mt-0.5" />;
  }
  if (lowerAlert.includes("security") || lowerAlert.includes("breach") || lowerAlert.includes("access") || lowerAlert.includes("perimeter")) {
    return <ShieldAlert className="h-5 w-5 flex-shrink-0 text-orange-500 mt-0.5" />;
  }
  if (lowerAlert.includes("thermal") || lowerAlert.includes("temperature") || lowerAlert.includes("cooling")) {
      return <Flame className="h-5 w-5 flex-shrink-0 text-orange-600 mt-0.5" />;
  }
   if (lowerAlert.includes("maintenance") || lowerAlert.includes("generator") || lowerAlert.includes("equipment stress")) {
      return <Activity className="h-5 w-5 flex-shrink-0 text-blue-400 mt-0.5" />;
  }
  if (lowerAlert.includes("intelligence") || lowerAlert.includes("chatter") || lowerAlert.includes("osint")) {
    return <Sigma className="h-5 w-5 flex-shrink-0 text-purple-400 mt-0.5" />
  }
  return <AlertTriangleIcon className="h-5 w-5 flex-shrink-0 text-yellow-300 mt-0.5" />;
};


export function AlertCard({ threatLevel, alerts, lastUpdated }: AlertCardProps) {
  const config = threatLevelConfig[threatLevel] || threatLevelConfig.unknown;

  return (
    <Card className={cn(
        "shadow-2xl border-t-4 bg-card/90 backdrop-blur-lg overflow-hidden animate-slideUp", // Increased blur and opacity
        config.borderColorClass, 
        config.bgColorClass?.split(' ')[0] 
    )}>
      <CardHeader className="pb-4 pt-5 px-5 md:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            {React.cloneElement(config.icon as React.ReactElement, { className: `h-7 w-7 md:h-8 md:w-8 ${config.colorClass} ${config.label === 'Critical' ? 'animate-ping' : ''}`})}
            Real-Time Threat Status
          </CardTitle>
          <div className={cn(
              "flex items-center gap-2.5 py-2 px-4 rounded-lg border-2 shadow-lg transition-all duration-300 hover:scale-105", // Increased padding, border, hover effect
              config.bgColorClass, 
              config.borderColorClass,
              config.glowClass
            )}
          >
            {React.cloneElement(config.icon as React.ReactElement, { className: `h-6 w-6 md:h-7 md:w-7 ${config.colorClass}`})}
            <span className={`text-lg md:text-xl font-semibold uppercase tracking-wider ${config.colorClass}`}>{config.label}</span>
          </div>
        </div>
        <CardDescription className="text-xs text-muted-foreground/80 pt-2">Facility Status Overview - Last Updated: {lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
        {alerts.length > 0 ? (
          <ul className="space-y-2.5 max-h-60 md:max-h-72 overflow-y-auto pr-2 custom-scrollbar">
            {alerts.map((alert, index) => (
              <li 
                key={index} 
                className={cn(
                  "flex items-start gap-3 text-sm p-3.5 bg-muted/60 rounded-md border border-border/80 hover:border-primary/70 hover:bg-muted/80 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg",
                  alert.toLowerCase().includes("critical") || alert.toLowerCase().includes("breach") || alert.toLowerCase().includes("exfiltration") ? "border-destructive/40 hover:border-destructive/70" : ""
                )}
              >
                {getAlertIcon(alert)}
                <span className="text-foreground/90 flex-1 leading-relaxed">{alert}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-3 text-sm p-4 bg-muted/60 rounded-md border border-green-500/50 shadow-md">
            <CheckCircle2 className="h-6 w-6 text-green-400" />
            <span className="text-foreground/90 font-medium">No active alerts. All systems nominal and secure.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
