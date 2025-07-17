
"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, ShieldCheck, Send, Phone, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  avatarSrc?: string;
  avatarFallback: string;
  isUser: boolean;
  avatarHint?: string;
  altText: string;
}

const initialContacts = [
  { name: "DAE Command", status: "Online", avatar: "DC", avatarHint: "DAE logo", id: "dae_cmd", lastMessage: "Acknowledged. Stand by for SITREP update.", altText: "DAE Command Avatar" },
  { name: "NDRF HQ", status: "Online", avatar: "NH", avatarHint: "NDRF logo", id: "ndrf_hq", lastMessage: "Team Bravo remains on alert.", altText: "NDRF HQ Avatar" },
  { name: "Local Emergency Unit", status: "Offline", avatar: "LE", avatarHint: "emergency services logo", id: "local_unit", lastMessage: "Unit offline since 02:00 AM.", altText: "Local Emergency Unit Avatar" },
  { name: "Site Security Chief", status: "Online", avatar: "SC", avatarHint: "security shield", id: "security_chief", lastMessage: "Perimeter check complete.", altText: "Site Security Chief Avatar"},
  { name: "Environmental Health", status: "Standby", avatar: "EH", avatarHint: "health cross", id: "env_health", lastMessage: "Monitoring atmospheric sensors.", altText: "Environmental Health Avatar"},
];

const initialMessages: Message[] = [
  { id: "1", sender: "DAE Command", text: "Situation report for Sector Alpha received. Acknowledged.", time: "10:32 AM", avatarSrc: "https://placehold.co/40x40.png", avatarFallback: "DC", isUser: false, avatarHint: "DAE logo", altText: "DAE Command Avatar" },
  { id: "2", sender: "Sentinel Shield (You)", text: "Copy. Sending updated sensor readings for Gamma-7. Anomaly detected in coolant pressure valve G7-PV-004.", time: "10:33 AM", avatarSrc: "https://placehold.co/40x40.png", avatarFallback: "SS", isUser: true, avatarHint: "app logo", altText: "Sentinel Shield Avatar" },
  { id: "3", sender: "NDRF HQ", text: "Team Bravo is on standby, status Green. Awaiting further instructions for potential deployment to Gamma-7.", time: "10:35 AM", avatarSrc: "https://placehold.co/40x40.png", avatarFallback: "NH", isUser: false, avatarHint: "NDRF logo", altText: "NDRF HQ Avatar" },
  { id: "4", sender: "Site Security Chief", text: "Patrol unit Zulu-3 en route to Gamma-7 for visual confirmation. ETA 5 minutes.", time: "10:36 AM", avatarSrc: "https://placehold.co/40x40.png", avatarFallback: "SC", isUser: false, avatarHint: "security shield", altText: "Site Security Chief Avatar"},
];


export default function CommsPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Sentinel Shield (You)",
      text: currentMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarSrc: "https://placehold.co/40x40.png",
      avatarFallback: "SS",
      isUser: true,
      avatarHint: "app logo",
      altText: "Sentinel Shield Avatar"
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setCurrentMessage("");
  };
  
  const getStatusColor = (status: string) => {
    if (status === "Online") return "bg-green-500 animate-pulse";
    if (status === "Offline") return "bg-red-500";
    if (status === "Standby") return "bg-yellow-500";
    return "bg-muted-foreground";
  };


  return (
    <MainLayout>
      <div className="grid gap-6 lg:grid-cols-3 animate-fadeIn">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-xl border-2 border-primary/30 bg-card/80 backdrop-blur-sm flex flex-col h-[calc(100vh-12rem)] sm:h-auto max-h-[750px]">
            <CardHeader className="border-b border-primary/20 p-5">
              <CardTitle className="text-xl md:text-2xl flex items-center gap-3 text-primary text-glow-primary">
                <MessageSquare className="h-7 w-7 md:h-8 md:w-8" />
                Secure Communications Hub
              </CardTitle>
              <CardDescription className="text-muted-foreground/90">
                AES-256 Encrypted, real-time coordination with DAE, NDRF, and critical facility personnel.
              </CardDescription>
            </CardHeader>
            <CardContent ref={chatContainerRef} className="flex-1 space-y-5 p-4 md:p-5 overflow-y-auto custom-scrollbar bg-muted/10">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex items-end gap-3 animate-slideUp", msg.isUser ? "flex-row-reverse" : "")} style={{animationDelay: '50ms'}}>
                  <Avatar className="shadow-md border-2 border-primary/30">
                    <AvatarImage src={msg.avatarSrc} alt={msg.altText} data-ai-hint={msg.avatarHint} />
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">{msg.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className={cn("max-w-[70%] sm:max-w-[75%] space-y-1", msg.isUser ? "text-right" : "")}>
                    <p className={cn("font-semibold text-xs text-muted-foreground/80", msg.isUser ? "mr-1" : "ml-1")}>{msg.sender}</p>
                    <div className={cn("p-3 rounded-xl shadow-md break-words text-sm leading-relaxed", 
                      msg.isUser 
                      ? "bg-primary text-primary-foreground rounded-br-none box-glow-primary-strong" 
                      : "bg-card text-card-foreground border border-input rounded-bl-none hover:border-primary/50 transition-colors"
                    )}>
                      {msg.text}
                    </div>
                    <p className={cn("text-xs text-muted-foreground/70 mt-1", msg.isUser ? "mr-1" : "ml-1")}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="p-4 md:p-5 border-t border-primary/20 bg-card/50">
              <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3 w-full items-center">
                <Input
                  type="text"
                  placeholder="Type your secure message..."
                  className="flex-1 h-11 sm:h-12 text-sm sm:text-base bg-background/70 border-input hover:border-primary/40 focus:border-primary focus:shadow-glow-primary-sm transition-all duration-200"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <Button type="submit" size="lg" className="h-11 sm:h-12 px-5 sm:px-6 group bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg hover:shadow-glow-primary-md transition-all duration-300 ease-in-out focus:ring-primary">
                  <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce-horizontal" /> Send
                </Button>
              </form>
            </CardFooter>
              <div className="px-4 md:px-5 pb-3 text-xs text-muted-foreground/70 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-green-400" /> All communications are end-to-end encrypted via Sentinel Protocol v3.2.
              </div>
          </Card>
        </div>

        <Card className="shadow-xl lg:col-span-1 border-2 border-accent/30 bg-card/80 backdrop-blur-sm self-start animate-slideUp animation-delay-200">
          <CardHeader className="border-b border-accent/20 p-5">
            <CardTitle className="text-lg md:text-xl flex items-center gap-2.5 text-accent text-glow-accent">
              <Users className="h-6 w-6 md:h-7 md:w-7" />
              Agency & Personnel Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 max-h-[calc(750px-150px)] overflow-y-auto custom-scrollbar">
            {initialContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3.5 rounded-lg border border-border/70 hover:bg-muted/50 hover:border-accent/50 hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 sm:h-11 sm:w-11 shadow-sm border-2 border-transparent group-hover:border-accent/70 transition-colors">
                    <AvatarImage src={`https://placehold.co/44x44.png`} alt={contact.altText} data-ai-hint={contact.avatarHint} />
                    <AvatarFallback className="text-base sm:text-lg bg-accent/20 text-accent font-semibold">{contact.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm sm:text-md text-foreground/90">{contact.name}</p>
                    <p className={`text-xs font-medium flex items-center gap-1.5 text-muted-foreground/80`}>
                       <span className={cn("h-2 w-2 rounded-full", getStatusColor(contact.status))}></span>
                      {contact.status}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-accent/70 hover:text-accent hover:bg-accent/10 rounded-full hover:shadow-glow-accent-sm transition-all duration-200" disabled aria-disabled="true">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Call {contact.name}</span>
                </Button>
              </div>
            ))}
          </CardContent>
           <CardFooter className="border-t border-accent/20 p-4">
            <Button variant="outline" className="w-full border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow-accent-md transition-all duration-300 ease-in-out focus:ring-accent">
                <UserPlus className="mr-2 h-4 w-4" /> Add New Contact
            </Button>
           </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
