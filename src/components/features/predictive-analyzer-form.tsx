
"use client";

import * as React from "react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; 
import { predictThreatScenario, type PredictThreatScenarioInput, type PredictThreatScenarioOutput } from "@/ai/flows/predict-threat-scenario";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, Zap, ShieldAlert, ListChecks, Thermometer, Binary, CalendarClock, AlertTriangle, Gauge, Eye, ShieldCheck, Brain, Lightbulb, MapPin, BarChart3, Network, AlertCircle, HelpCircle, Bot, Activity, Wind, Sigma
} from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  environmentalData: z.string().min(20, "Environmental data is too short. Provide more details.").max(3000),
  facilityData: z.string().min(20, "Facility data is too short. Provide more details.").max(3000),
  historicalIncidentData: z.string().min(20, "Historical incident data is too short. Provide more details.").max(3000),
  intelligenceFeeds: z.string().optional(),
});

export function PredictiveAnalyzerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictThreatScenarioOutput | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("Initializing analysis...");

  const form = useForm<PredictThreatScenarioInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      environmentalData: "Temp: 22°C, Humidity: 55%, Wind: 5km/h SW, Baro: 1012hPa, Rad: 0.04uSv/h, PM2.5: 10µg/m³, PM10: 15µg/m³, Solar Flare: None. Seismic Activity: Minimal (0.2 Richter). Atmospheric Pressure Change Rate: -0.5 hPa/hr.",
      facilityData: "Core Temp: 310°C (Nominal), Coolant Flow A: 100%, B: 98% (Optimal), Security System: All Green/Patched v3.2.1, Perimeter Sensors: Sector G-7 reporting intermittent signal loss (ID: PS-G7-004), Network Traffic: Normal (avg 200Mbps inbound, 50Mbps outbound), Access Logs: Unscheduled maintenance override by UserID S_KIM at 03:15 AM for Control System Alpha (Zone 3), Backup Generator: Online/Fuel 95%, Secondary Coolant: Standby/Full. Drone surveillance Gamma route: Active. Key personnel on-site: 125.",
      historicalIncidentData: "2022-05-15: Minor coolant leak (Pump P-02B failure due to seal degradation), resolved in 4 hrs, lessons: improved pump maintenance predictive model implemented, quarterly seal integrity checks. 2023-01-10: False alarm (wildlife near Sector Delta), response protocols tested, communication lag identified between field team and command (resolved via comms upgrade Q2 2023). 2023-11-20: Security drill (simulated cyber-physical breach via ICS vulnerability), response time: 7 mins (satisfactory), identified need for enhanced ICS network segmentation.",
      intelligenceFeeds: "OSINT: Dark web forum 'ShadowNet' mentions increased interest in 'facility XYZ' vulnerabilities. Credibility: Low. Agency Alert (NatSec-034-24): General alert for heightened cyber threat activity targeting critical infrastructure in region. Social Media: Local protest group 'GreenFuture' planning peaceful demonstration near facility on 2024-08-15. No direct threats identified.",
    },
  });

  const progressTexts = [
    "Initializing analysis core...",
    "Parsing environmental data stream...",
    "Integrating facility sensor inputs...",
    "Cross-referencing historical incidents...",
    "Analyzing intelligence feeds...",
    "Building threat probability matrix...",
    "Correlating multi-vector data points...",
    "Simulating potential scenarios...",
    "Calculating confidence scores...",
    "Generating mitigation strategies...",
    "Finalizing report...",
  ];

  const onSubmit: SubmitHandler<PredictThreatScenarioInput> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);
    setProgressText(progressTexts[0]);

    let currentProgressStep = 0;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) { // Don't let interval complete it, only successful API call
          clearInterval(progressInterval);
          return prev;
        }
        const nextProgress = prev + (100 / progressTexts.length) * 0.8; // Make it a bit slower
        if (Math.floor(nextProgress / (100/progressTexts.length)) > currentProgressStep) {
            currentProgressStep++;
            setProgressText(progressTexts[currentProgressStep] || "Finalizing report...");
        }
        return Math.min(nextProgress, 95);
      });
    }, 400);

    try {
      const prediction = await predictThreatScenario(data);
      clearInterval(progressInterval); // Clear interval before setting final progress
      setProgressText("Analysis Complete!");
      setProgress(100);
      setResult(prediction);
    } catch (e) {
      clearInterval(progressInterval);
      setError(e instanceof Error ? e.message : "An unknown error occurred during analysis.");
      console.error("Prediction error:", e);
      setProgressText("Analysis Failed!");
      setProgress(0); 
    } finally {
      setIsLoading(false);
    }
  };

  const getThreatLevelConfig = (level: string | undefined) => {
    switch (level?.toLowerCase()) {
      case "low":
        return { variant: "default", className: "bg-green-500/90 hover:bg-green-500/80 border-green-600 text-primary-foreground shadow-glow-primary-md", Icon: ShieldCheck };
      case "medium":
        return { variant: "secondary", className: "bg-yellow-500/90 hover:bg-yellow-500/80 border-yellow-600 text-black shadow-glow-accent-md", Icon: ShieldAlert };
      case "high":
        return { variant: "destructive", className: "bg-orange-500 hover:bg-orange-600 border-orange-700 text-white shadow-glow-accent-lg", Icon: AlertTriangle };
      case "critical":
        return { variant: "destructive", className: "bg-red-600 hover:bg-red-700 border-red-800 text-white animate-pulse shadow-glow-destructive-lg", Icon: AlertCircle };
      default:
        return { variant: "outline", className: "border-muted-foreground text-muted-foreground", Icon: HelpCircle };
    }
  };
  
  const resultSectionIcons = {
    "Potential Threats Identified": Zap,
    "Early Warning Indicators": Eye,
    "Recommended Actions": ListChecks,
    "Suggested Data Points to Monitor": Lightbulb,
  };

  const renderListItem = (text: string, Icon: React.ElementType, iconColor: string = "text-primary", itemKey: React.Key) => (
    <li key={itemKey} className="flex items-start gap-3 p-3.5 bg-muted/50 rounded-lg border border-border/70 hover:border-primary/60 hover:bg-muted/70 transition-all duration-200 shadow-sm hover:shadow-md">
        <Icon size={20} className={`${iconColor} mt-0.5 flex-shrink-0`} />
        <span className="text-foreground/85 leading-relaxed text-sm">{text}</span>
    </li>
  );

  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-2 border-primary/40 bg-card/80 backdrop-blur-md overflow-hidden animate-slideUp">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-card to-card/80 border-b border-primary/30">
              <CardTitle className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-primary text-glow-primary">
                <Bot className="h-9 w-9 sm:h-10 sm:w-10 animate-pulse" />
                Sentinel AI: Predictive Threat Analysis Engine
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-muted-foreground/90 mt-1.5">
                Input comprehensive data streams for an in-depth CBRN threat assessment. The AI will correlate information, identify potential vectors, and suggest mitigation strategies.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-6">
              {[
                { name: "environmentalData", label: "Environmental Data", icon: Wind, placeholder: "e.g., Temp: 22°C, Humidity: 55%, Wind: 5km/h SW, Pressure: 1012hPa, Radiation: 0.04uSv/h, PM2.5: 10, PM10: 15, Solar Flare: None, Seismic Activity: Minimal, Atmospheric Pressure Change Rate: -0.5 hPa/hr." },
                { name: "facilityData", label: "Facility & Sensor Data", icon: Network, placeholder: "e.g., Reactor Temp: 310°C (Nominal), Coolant Flow: 100%, Security: All Green/Patched v3.2.1, Perimeter Sensors: Sector G-7 intermittent signal loss (PS-G7-004), Network Traffic: Normal, Access Logs: Unscheduled maintenance override UserID S_KIM for Control System Alpha." },
                { name: "historicalIncidentData", label: "Historical Incident Data", icon: CalendarClock, placeholder: "e.g., 2022-05-15: Coolant leak (Pump P-02B), resolved 4hrs. Lessons: improved pump maintenance. 2023-01-10: False alarm. 2023-11-20: Security drill, response 7m." },
                { name: "intelligenceFeeds", label: "External Intelligence Feeds (Optional)", icon: Sigma, placeholder: "e.g., OSINT reports, agency alerts, social media sentiment relevant to facility security or operational risks. Dark web chatter." },
              ].map(item => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name as keyof PredictThreatScenarioInput}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2.5 text-md sm:text-lg font-semibold text-primary/95 hover:text-primary transition-colors">
                        <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />{item.label}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={item.placeholder}
                          className="min-h-[100px] sm:min-h-[120px] resize-y bg-input/80 border-input hover:border-primary/50 focus:border-primary focus:shadow-glow-primary-sm text-sm transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
            <CardFooter className="p-6 sm:p-8 bg-card/80 border-t border-primary/30">
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto text-base sm:text-lg py-3.5 sm:py-4 px-8 sm:px-10 group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-glow-primary-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:shadow-glow-primary-lg">
                {isLoading ? (
                  <Loader2 className="mr-2.5 h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                ) : (
                  <Zap className="mr-2.5 h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-ping-slow" />
                )}
                Initiate Deep Analysis
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && !result && (
         <Card className="shadow-xl border-2 border-accent/50 bg-card/80 backdrop-blur-md animate-fadeIn cyber-panel-accent">
          <CardHeader className="p-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-3 text-accent text-glow-accent">
              <Loader2 className="h-7 w-7 animate-spin" />
              Correlating Data Streams... Please Stand By.
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground/90 mt-1.5">Sentinel AI is processing inputs and generating threat matrix. This may take a few moments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-6">
             <Progress value={progress} className="w-full h-4 bg-muted/50 [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary transition-all duration-300 shadow-inner rounded-full" />
             <p className="text-center text-sm text-accent/90 font-medium">{progressText}</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive" className="shadow-xl border-2 border-destructive/70 bg-destructive/20 backdrop-blur-md p-6 animate-fadeIn">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <AlertTitle className="text-xl sm:text-2xl font-bold mt-1 text-glow-destructive">Critical Analysis Failure</AlertTitle>
          <AlertDescription className="text-base mt-2 text-destructive-foreground/80">
            An error occurred during the threat prediction process: {error}
            <br />
            Please review your inputs or contact support if the issue persists. Check console for details.
          </AlertDescription>
        </Alert>
      )}

      {result && !isLoading && (
        <Card className="shadow-2xl animate-fadeIn duration-700 border-2 border-primary/60 bg-card/80 backdrop-blur-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/80 to-accent/70 text-primary-foreground p-6 sm:p-8 rounded-t-md shadow-lg">
            <CardTitle className="text-2xl sm:text-3xl flex items-center gap-3">
              <ShieldCheck className="h-9 w-9 sm:h-10 sm:w-10" />
              AI Threat Prediction Report
            </CardTitle>
            <CardDescription className="text-base text-primary-foreground/80 mt-1.5">Comprehensive analysis complete. Review the strategic insights below.</CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="grid md:grid-cols-5 gap-px bg-border/60"> 
              {/* Main Info Column */}
              <div className="md:col-span-3 p-6 bg-card space-y-6">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2.5 text-primary text-glow-primary">
                        {React.createElement(getThreatLevelConfig(result.threatLevel).Icon, { className: "h-7 w-7" })}
                        Overall Threat Level
                    </h3>
                    <Badge
                        className={cn(
                          "text-lg sm:text-xl px-5 py-2 capitalize font-bold shadow-md transition-all duration-300 hover:scale-105",
                          getThreatLevelConfig(result.threatLevel).className
                        )}
                    >
                        {result.threatLevel || "Unknown"}
                    </Badge>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-primary/90"><MapPin className="h-5 w-5" />Primary Threat Vector</h3>
                    <p className="text-md p-3.5 bg-muted/40 rounded-lg border border-input shadow-sm text-foreground/95 font-medium">{result.threatVector || "Not specified"}</p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-primary/90"><Activity className="h-5 w-5" />Impact Assessment</h3>
                    <p className="text-sm p-3.5 bg-muted/40 rounded-lg border border-input shadow-sm leading-relaxed text-foreground/80">{result.impactAssessment || "Not specified"}</p>
                </div>
              </div>

              {/* Confidence Score Column */}
              <div className="md:col-span-2 p-6 bg-card border-l border-border/60 space-y-6 flex flex-col justify-center">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold flex items-center gap-2.5 text-primary text-glow-primary">
                      <Gauge className="h-7 w-7" />
                      Prediction Confidence
                  </h3>
                  <div className="flex items-center gap-4 pt-1">
                      <Progress value={result.confidenceScore * 100} className="w-full h-5 bg-muted/60 [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary transition-all duration-300 shadow-inner rounded-full" />
                      <span className="text-3xl font-bold text-primary text-glow-primary">{(result.confidenceScore * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-sm p-3.5 bg-muted/40 rounded-lg border border-input shadow-sm text-muted-foreground leading-relaxed">{result.confidenceReasoning || "No reasoning provided."}</p>
                </div>
              </div>
            </div>
            
            {Object.entries(resultSectionIcons).map(([title, Icon]) => {
                const items = result[title.replace(/ /g, '').replace('Identified', '').replace('Suggested', 'suggested').replace('ToMonitor', 'ToMonitor').replace(/^./, (match) => match.toLowerCase()) as keyof PredictThreatScenarioOutput] as string[];
                const itemColor = title.includes("Threats") ? "text-red-400" : title.includes("Actions") ? "text-green-400" : title.includes("Monitor") ? "text-purple-400" : "text-blue-400";
                const emptyText = `No specific ${title.toLowerCase().replace(' identified', '')} based on current data.`;
                
                return (
                    <div key={title} className="p-6 border-t border-border/60 bg-card space-y-3">
                        <h3 className="text-xl font-semibold flex items-center gap-2.5 text-primary/95">
                            <Icon className={`h-6 w-6 ${itemColor}`} />
                            {title}
                        </h3>
                        {items && items.length > 0 ? (
                            <ul className="space-y-2.5 pl-1">
                              {items.map((item, index) => renderListItem(item, resultSectionIcons[title as keyof typeof resultSectionIcons] || HelpCircle, itemColor, index))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground p-3.5 bg-muted/30 rounded-lg border italic text-sm">{emptyText}</p>
                        )}
                    </div>
                );
            })}
          </CardContent>
           <CardFooter className="p-6 bg-card/90 border-t border-primary/40 rounded-b-md text-center">
                <p className="text-xs text-muted-foreground w-full">Sentinel AI Analysis Engine v2.1 - Report Generated: {new Date().toLocaleString()}</p>
            </CardFooter>
        </Card>
      )}
    </div>
  );
}
