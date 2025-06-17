"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeAlert, CheckCircle2, Info } from "lucide-react";

interface ComplianceResultCardProps {
  advice: string | null;
  isLoading: boolean;
  error: string | null;
  shipmentDetails?: {
    mineralType: string;
    quantity: string;
    destination: string;
  };
}

export function ComplianceResultCard({ advice, isLoading, error, shipmentDetails }: ComplianceResultCardProps) {
  if (!isLoading && !advice && !error) {
    return null; // Don't render if there's nothing to show and not loading
  }

  return (
    <Card className="w-full shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          {isLoading ? <Info className="mr-2 h-6 w-6 animate-pulse text-primary" /> : 
           error ? <BadgeAlert className="mr-2 h-6 w-6 text-destructive" /> : 
           <CheckCircle2 className="mr-2 h-6 w-6 text-green-600" />
          }
          Compliance Information
        </CardTitle>
        {shipmentDetails && !isLoading && (
           <CardDescription>
            For: {shipmentDetails.quantity} of {shipmentDetails.mineralType} to {shipmentDetails.destination} (Origin: Sierra Leone)
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {advice && !isLoading && !error && (
          <ScrollArea className="h-48 rounded-md border p-4 bg-background">
            <p className="text-sm whitespace-pre-wrap">{advice}</p>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
