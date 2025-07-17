
"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { AlertCard } from "@/components/features/alert-card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BrainCircuit, ScanSearch, MessageSquare, ArrowRight, Globe, Camera, Building, Zap } from "lucide-react"; 
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const coreFeatureCards = [
  {
    title: "Predictive Threat Analyzer",
    description: "Leverage AI to forecast potential CBRN threats based on complex data patterns.",
    href: "/analyzer",
    icon: <BrainCircuit className="h-7 w-7" />,
    image: "https://placehold.co/600x400.png",
    altText: "AI analysis brain interface",
    imageHint: "AI analysis brain",
    cta: "Access Analyzer",
    accentColor: "primary"
  },
  {
    title: "AR Simulation Module",
    description: "Engage in interactive AR training simulations for effective incident response.",
    href: "/simulation",
    icon: <ScanSearch className="h-7 w-7" />,
    image: "https://placehold.co/600x400.png",
    altText: "Augmented reality goggles interface",
    imageHint: "AR interface goggles",
    cta: "Launch Simulations",
    accentColor: "accent"
  },
  {
    title: "Secure Communications Hub",
    description: "Coordinate seamlessly with DAE and NDRF via encrypted channels.",
    href: "/comms",
    icon: <MessageSquare className="h-7 w-7" />,
    image: "https://placehold.co/600x400.png",
    altText: "Secure communication network grid",
    imageHint: "secure communication network",
    cta: "Open Comms Hub",
    accentColor: "secondary"
  },
];

const advancedFeatureCards = [
  {
    title: "Geospatial Threat Mapping",
    description: "Visualize threat propagation and critical asset status on an interactive 3D facility map.",
    href: "/geo-map",
    icon: <Globe className="h-7 w-7" />,
    image: "https://placehold.co/600x400.png",
    altText: "3D geospatial map interface",
    imageHint: "3D map interface globe",
    cta: "View Geo-Map",
    disabled: false,
    accentColor: "primary"
  },
  {
    title: "Integrated Drone Surveillance",
    description: "Access real-time aerial reconnaissance feeds for enhanced situational awareness.",
    href: "/drones",
    icon: <Camera className="h-7 w-7" />,
    image: "https://placehold.co/600x400.png",
    altText: "Drone network feed display",
    imageHint: "drone view aerial",
    cta: "Access Drone Feeds",
    disabled: false,
    accentColor: "accent"
  },
   {
    title: "Facility Digital Twin",
    description: "Monitor and manage facility operations through a dynamic, data-rich digital replica.",
    href: "/digital-twin",
    icon: <Building className="h-7 w-7" />,
    image: "https://placehold.co/600x400.png",
    altText: "Facility digital twin interface",
    imageHint: "digital twin interface facility",
    cta: "Explore Digital Twin",
    disabled: false,
    accentColor: "secondary"
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const MotionCard = motion(Card);

export default function DashboardPage() {
  const currentThreatLevel = "medium";
  const currentAlerts = [
    "Thermal Anomaly: Sector Gamma-7 cooling array (Sensor ID: C7-TH-003). Reading: 75°C (Threshold: 60°C). Potential equipment stress.",
    "Air Quality Alert: Area Delta-4 reports anomalous particulate levels (PM2.5: 45µg/m³, PM10: 60µg/m³). Wind: ENE 15km/h. Possible external contaminant.",
    "Network Anomaly: High outbound data flow (3.5GB/10min) from ICS server (10.1.5.22) to external IP 203.0.113.45. Possible data exfiltration attempt.",
    "Perimeter Breach: Sensor P-12B (West Gate) triggered. Visual confirmation pending. Security patrol dispatched. ETA: 2 min.",
  ];
  const [lastUpdated, setLastUpdated] = useState("Loading...");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short'}));
  }, []);

  const renderFeatureCard = (feature: typeof coreFeatureCards[0] | typeof advancedFeatureCards[0], index: number) => {
    const hoverClasses = 
      feature.accentColor === 'primary' ? 'group-hover:border-primary/70 group-hover:shadow-glow-soft-primary' :
      feature.accentColor === 'accent' ? 'group-hover:border-accent/70 group-hover:shadow-glow-soft-accent' :
      'group-hover:border-secondary-foreground/40 group-hover:shadow-md';
    
    const iconBgClass = 
      feature.accentColor === 'primary' ? 'bg-primary/20 text-primary group-hover:bg-primary/30' :
      feature.accentColor === 'accent' ? 'bg-accent/20 text-accent group-hover:bg-accent/30' :
      'bg-secondary/20 text-secondary-foreground group-hover:bg-secondary/30';

    const titleClass = 
      feature.accentColor === 'primary' ? 'text-primary' :
      feature.accentColor === 'accent' ? 'text-accent' :
      'text-foreground';

    return (
      <MotionCard 
        key={feature.title} 
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "flex flex-col overflow-hidden group glass-card", 
          hoverClasses,
          (feature as any).disabled ? "opacity-60 grayscale-[30%]" : ""
        )}
        whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
      >
        <div className="relative h-44 md:h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={feature.image}
            alt={feature.altText}
            layout="fill"
            objectFit="cover"
            data-ai-hint={feature.imageHint}
            className={cn("transition-transform duration-300", !(feature as any).disabled && "group-hover:scale-105")}
            priority={index < 2} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-card/40 to-transparent"></div>
          <div className={cn(
            "absolute top-3.5 left-3.5 p-2.5 rounded-md shadow-lg transition-all duration-300 backdrop-blur-sm",
            iconBgClass,
            !(feature as any).disabled && "group-hover:scale-105"
          )}>
            {React.cloneElement(feature.icon, {className: "h-6 w-6"})}
          </div>
        </div>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className={cn("text-lg md:text-xl leading-tight font-semibold transition-colors duration-300", titleClass)}>{feature.title}</CardTitle>
          <CardDescription className="pt-1 text-sm text-muted-foreground min-h-[56px]">{feature.description}</CardDescription>
        </CardHeader>
        <CardFooter className="p-4 mt-auto">
          <Button 
            asChild 
            variant={feature.accentColor === 'primary' ? 'default' : feature.accentColor === 'accent' ? 'default' : 'secondary'} 
            className={cn(
            "w-full group/button text-sm py-2.5 transition-all duration-300 ease-in-out",
            feature.accentColor === 'accent' && 'bg-accent text-accent-foreground hover:bg-accent/90 focus:bg-accent/90 shadow-md hover:shadow-glow-soft-accent',
            (feature as any).disabled ? "cursor-not-allowed opacity-70" : ""
            )} 
            disabled={(feature as any).disabled}
          >
            <Link href={feature.href} aria-disabled={(feature as any).disabled} tabIndex={(feature as any).disabled ? -1 : undefined}>
              {feature.cta} <ArrowRight className="ml-1.5 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </MotionCard>
    );
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 md:space-y-10"
      >
        <AlertCard
          threatLevel={currentThreatLevel}
          alerts={currentAlerts}
          lastUpdated={lastUpdated}
        />

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-5 md:mb-6 border-b-2 border-border/70 pb-3 flex items-center gap-3">
            <Zap className="h-7 w-7 md:h-8 md:w-8 text-primary" /> Core Modules
          </h2>
          <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coreFeatureCards.map((feature, index) => renderFeatureCard(feature, index))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-5 md:mb-6 border-b-2 border-border/70 pb-3 flex items-center gap-3">
            <Building className="h-7 w-7 md:h-8 md:w-8 text-accent" /> Advanced Systems Console
          </h2>
           <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advancedFeatureCards.map((feature, index) => renderFeatureCard(feature, index + coreFeatureCards.length))}
          </div>
        </section>
      </motion.div>
    </MainLayout>
  );
}
