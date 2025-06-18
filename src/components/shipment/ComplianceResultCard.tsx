"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";

interface ComplianceResultCardProps {
  complianceInformation: string;
  className?: string;
}

export function ComplianceResultCard({
  complianceInformation,
  className = "",
}: ComplianceResultCardProps) {
  return (
    <Card className={`w-full shadow-lg ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <CardTitle>Compliance Information</CardTitle>
        </div>
        <CardDescription>
          Review the compliance requirements and advice for your shipment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <div className="space-y-4">
            {complianceInformation.split("\n").map((paragraph, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
