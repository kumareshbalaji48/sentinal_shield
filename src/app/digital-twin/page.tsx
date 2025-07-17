
"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import type { TooltipProps } from "recharts";
import { Building, Zap, Layers, SlidersHorizontal, AlertTriangle, Thermometer, Wind, Wrench, ShieldCheck, Activity, Users, BarChartHorizontalBig, PackageCheck, ChevronsUpDown, PowerOff, PowerIcon, Radiation } from "lucide-react";
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[300px]" />,
});
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const RechartsTooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });


const initialEnergyOutputData = [
  { time: "00:00", output: 850, demand: 830 }, { time: "02:00", output: 840, demand: 825 },
  { time: "04:00", output: 835, demand: 820 }, { time: "06:00", output: 860, demand: 850 },
  { time: "08:00", output: 920, demand: 910 }, { time: "10:00", output: 940, demand: 935 },
  { time: "12:00", output: 950, demand: 945 }, { time: "14:00", output: 935, demand: 930 },
  { time: "16:00", output: 930, demand: 920 }, { time: "18:00", output: 900, demand: 890 },
  { time: "20:00", output: 880, demand: 870 }, { time: "22:00", output: 860, demand: 850 },
];

const systemHealthData = [
  { name: "Reactor Core Alpha", health: 98, status: "Nominal", details: "Temp: 315°C, Pressure: 155 bar" },
  { name: "Coolant System A-1", health: 95, status: "Optimal", details: "Flow: 100%, Temp: 60°C" },
  { name: "Coolant System B-2 (Redundant)", health: 72, status: "Warning", details: "Pump P-04B Vibration High. Efficiency: 85%" },
  { name: "Power Grid Interlink XFMR-01", health: 99, status: "Stable", details: "Load: 920MW, Voltage: 345kV" },
  { name: "Backup Diesel Generators (x3)", health: 92, status: "Ready", details: "Fuel: 98%, Last Test: 2024-07-15 OK" },
  { name: "Containment Structure Integrity", health: 100, status: "Secure", details: "Pressure: -0.5 kPa, Sensors: OK" },
];

const maintenanceSchedule = [
    { task: "Turbine T-01A Bearing Lubrication", dueDate: "2024-08-15", status: "Scheduled", priority: "Medium", team: "MechEng" },
    { task: "Coolant Pump P-04B Vibration Analysis", dueDate: "2024-08-05", status: "Overdue", priority: "High", team: "PredictiveMaint" },
    { task: "ICS Firewall Patch CVE-2024-XXXX", dueDate: "2024-08-10", status: "Pending Deployment", priority: "Critical", team: "CyberSec" },
    { task: "Containment Airlock Seal Test (A-03)", dueDate: "2024-09-01", status: "Upcoming", priority: "High", team: "Ops" },
    { task: "Radiation Monitor Calibration RM-S5", dueDate: "2024-08-20", status: "Scheduled", priority: "Medium", team: "HealthPhys" },
];

export default function DigitalTwinPage() {
  const [energyData, setEnergyData] = useState(initialEnergyOutputData);
  const [coreTemp, setCoreTemp] = useState(315.2); 
  const [facilityPowerDemand, setFacilityPowerDemand] = useState(905); 
  const [ambientTemp, setAmbientTemp] = useState(23.5); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCoreTemp(ct => parseFloat(Math.max(300, Math.min(330, ct + (Math.random() - 0.5) * 1.5)).toFixed(1)));
      setFacilityPowerDemand(pd => parseFloat(Math.max(800, Math.min(1000, pd + (Math.random() - 0.5) * 15)).toFixed(0)));
      setAmbientTemp(at => parseFloat(Math.max(15, Math.min(35, at + (Math.random() - 0.5) * 0.8)).toFixed(1)));
      setEnergyData(prev => {
        const lastEntry = prev[prev.length - 1];
        const newTime = new Date(new Date(`2000/01/01 ${lastEntry.time}:00`).getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const newOutput = Math.max(800, Math.min(980, lastEntry.output + (Math.random() - 0.45) * 25));
        const newDemand = Math.max(780, Math.min(970, newOutput - 10 + (Math.random() - 0.5) * 20));
        return [...prev.slice(1), { time: newTime, output: parseFloat(newOutput.toFixed(0)), demand: parseFloat(newDemand.toFixed(0)) }];
      });
    }, 3500); 
    return () => clearInterval(interval);
  }, []);

  const chartConfig = {
    output: { label: "Energy Output (MW)", color: "hsl(var(--primary))" },
    demand: { label: "Power Demand (MW)", color: "hsl(var(--accent))" },
  };

  const getHealthColor = (health: number) => {
    if (health > 90) return "bg-green-500";
    if (health > 70) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getPriorityBadge = (priority: string) => {
    if (priority === "Critical") return "bg-red-600 text-red-foreground hover:bg-red-700 shadow-glow-destructive-md";
    if (priority === "High") return "bg-orange-500 text-orange-foreground hover:bg-orange-600 shadow-glow-accent-sm";
    if (priority === "Medium") return "bg-yellow-500 text-yellow-foreground hover:bg-yellow-600";
    return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 cyber-panel border-primary shadow-xl text-xs">
          <p className="label text-sm font-semibold text-primary mb-1">{`Time: ${label}`}</p>
          {payload.map((pld, index) => (
            <p key={index} style={{ color: pld.color }} className="font-medium">
              {`${pld.name}: ${pld.value?.toLocaleString()} MW`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="space-y-6 md:space-y-8 animate-fadeIn">
        <Card className="shadow-xl border-2 border-primary/30 bg-card/80 backdrop-blur-sm">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2.5 text-primary text-glow-primary">
              <Building className="h-7 w-7 md:h-8 md:h-8" /> Facility Digital Twin Console
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground/90 mt-1.5">Dynamic, data-rich replica for real-time monitoring, predictive maintenance, and operational optimization of the nuclear facility.</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Total Energy Output", value: `${energyData[energyData.length -1].output.toFixed(0)} MW`, change: `${(energyData[energyData.length -1].output - energyData[energyData.length -2].output).toFixed(0)} MW vs prev`, icon: Zap, color: "text-primary" },
            { title: "Reactor Core Temperature", value: `${coreTemp.toFixed(1)} °C`, change: "Optimal: 305-325 °C", icon: Thermometer, color: coreTemp > 325 || coreTemp < 305 ? 'text-orange-400' : 'text-green-400' },
            { title: "Current Power Demand", value: `${facilityPowerDemand.toFixed(0)} MW`, change: "Grid Stability: Nominal", icon: Activity, color: "text-accent" },
          ].map((item, index) => (
            <Card key={index} className="shadow-lg hover:shadow-glow-primary-sm transition-all duration-300 border-border/70 hover:border-primary/50 bg-card/90 backdrop-blur-sm animate-slideUp" style={{animationDelay: `${100 + index*100}ms`}}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <CardTitle className="text-sm font-medium text-primary/90">{item.title}</CardTitle>
                <item.icon className={cn("h-5 w-5", item.color === "text-primary" ? "text-primary/70" : item.color === "text-accent" ? "text-accent/70" : item.color)} />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className={cn("text-3xl font-bold", item.color)}>{item.value}</div>
                <p className="text-xs text-muted-foreground/80">{item.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-xl border-2 border-primary/40 bg-card/80 backdrop-blur-sm animate-slideUp animation-delay-200">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-primary text-glow-primary"><BarChartHorizontalBig className="h-6 w-6"/>Energy Output & Demand (Simulated)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] p-2 md:p-4">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <AreaChart data={energyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.4)" />
                <XAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={{ stroke: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={{ stroke: 'hsl(var(--muted-foreground))' }} unit="MW" domain={['dataMin - 50', 'auto']} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--primary)/0.15)'}}/>
                <ChartLegend content={<ChartLegendContent wrapperStyle={{paddingTop: '10px'}}/>} />
                <defs>
                  <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="output" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorOutput)" strokeWidth={2.5} dot={{ r: 3, fill: 'hsl(var(--primary))', strokeWidth:1, stroke: 'hsl(var(--background))' }} activeDot={{r: 5, className: "shadow-glow-primary-md stroke-2 stroke-background"}}/>
                <Area type="monotone" dataKey="demand" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={2} dot={{ r: 3, fill: 'hsl(var(--accent))', strokeWidth:1, stroke: 'hsl(var(--background))' }} activeDot={{r: 5, className: "shadow-glow-accent-md stroke-2 stroke-background"}}/>
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            <Card className="shadow-lg bg-card/90 backdrop-blur-sm border-border/70 animate-slideUp animation-delay-300">
            <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-primary/95 text-glow-primary"><ShieldCheck className="h-6 w-6"/>System Health Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 space-y-3.5">
                {systemHealthData.map(system => (
                    <div key={system.name} className="p-3.5 bg-muted/40 rounded-md border border-input hover:border-primary/40 transition-colors duration-200 group">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="font-medium text-foreground/90 text-sm group-hover:text-primary transition-colors">{system.name}</span>
                        <Badge variant={system.health > 90 ? "default" : system.health > 70 ? "secondary" : "destructive"}
                               className={cn("text-xs px-2 py-0.5", system.health > 90 ? "bg-green-500/80 text-primary-foreground" : system.health > 70 ? "bg-yellow-500/80 text-black" : "")}
                        >
                        {system.status}
                        </Badge>
                    </div>
                    <Progress value={system.health} className="h-2.5" indicatorClassName={getHealthColor(system.health)} />
                    <p className="text-xs text-muted-foreground/80 mt-1.5">{system.details}</p>
                    </div>
                ))}
            </CardContent>
            </Card>

            <Card className="shadow-lg bg-card/90 backdrop-blur-sm border-border/70 animate-slideUp animation-delay-400">
            <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-primary/95 text-glow-primary"><Wrench className="h-6 w-6"/>Upcoming & Critical Maintenance</CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-h-[400px] overflow-y-auto custom-scrollbar">
                <Table>
                <TableHeader>
                    <TableRow className="border-b-border/50">
                    <TableHead className="text-primary/80 pl-4 md:pl-6">Task</TableHead>
                    <TableHead className="text-primary/80">Due</TableHead>
                    <TableHead className="text-primary/80 text-center pr-4 md:pr-6">Priority</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {maintenanceSchedule.map(item => (
                    <TableRow key={item.task} className={cn("border-b-border/30 hover:bg-muted/50 transition-colors", item.status === 'Overdue' ? 'bg-destructive/10 hover:bg-destructive/20' : '')}>
                        <TableCell className="font-medium text-sm text-foreground/90 py-3 pl-4 md:pl-6">{item.task} <span className="text-xs text-muted-foreground">({item.team})</span></TableCell>
                        <TableCell className="text-xs text-muted-foreground/90">{item.dueDate}</TableCell>
                        <TableCell className="text-center pr-4 md:pr-6">
                             <Badge className={cn("text-xs px-2 py-0.5 w-[80px] justify-center", getPriorityBadge(item.priority))}>
                                {item.priority}
                            </Badge>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="p-4 md:p-6 border-t border-border/50">
                <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:shadow-glow-primary-sm transition-all duration-200">
                    <SlidersHorizontal className="mr-2 h-4 w-4"/> View Full Maintenance Log & Schedule
                </Button>
            </CardFooter>
            </Card>
        </div>

        <Card className="shadow-lg bg-card/90 backdrop-blur-sm border-border/70 animate-slideUp animation-delay-500">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-primary/95 text-glow-primary"><Wind className="h-6 w-6"/>Environmental Conditions</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4 p-4 md:p-6 pt-0 text-center">
            {[
                {label: "Ambient Temperature", value: `${ambientTemp.toFixed(1)}°C`, icon: Thermometer},
                {label: "Barometric Pressure", value: "1012.5 hPa", icon: ChevronsUpDown},
                {label: "Background Radiation", value: "0.05 µSv/h", icon: Radiation}
            ].map((item, idx) => (
                 <div key={idx} className="p-4 bg-muted/40 rounded-lg border border-input hover:border-primary/40 transition-colors duration-200 group">
                    <item.icon className="h-6 w-6 text-primary/80 mx-auto mb-2 group-hover:text-primary transition-colors"/>
                    <p className="text-sm text-muted-foreground/90">{item.label}</p>
                    <p className="text-2xl font-bold text-foreground/90 mt-1 group-hover:text-primary/90 transition-colors">{item.value}</p>
                </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}

    