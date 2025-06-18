"use client";

import type { ComplianceInformationInput } from "@/ai/flows/compliance-advisor";
import type { Shipment, ShipmentInput } from "@/types/shipment";
import { getComplianceInformation } from "@/ai/flows/compliance-advisor";
import { useState } from "react";
import { ShipmentForm } from "@/components/shipment/ShipmentForm";
import { ComplianceResultCard } from "@/components/shipment/ComplianceResultCard";
import { ShipmentTrackingCard } from "@/components/shipment/ShipmentTrackingCard";
import { useToast } from "@/hooks/use-toast";

function generateTrackingId() {
  return `SHP${Date.now().toString(36).toUpperCase()}`;
}

export function NewShipmentSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [complianceAdvice, setComplianceAdvice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentShipment, setCurrentShipment] = useState<Shipment | null>(null);
  const { toast } = useToast();

  const handleShipmentSubmit = async (data: ShipmentInput) => {
    setIsLoading(true);
    setError(null);
    setComplianceAdvice(null);

    try {
      // First, get compliance information
      const complianceResult = await getComplianceInformation({
        mineralType: data.parcelType, // Map parcelType to mineralType
        quantity: data.weight, // Map weight to quantity
        destination: data.destination,
        origin: data.origin || "Sierra Leone",
      });

      setComplianceAdvice(complianceResult.complianceInformation);

      // Create the shipment with tracking details
      const shipmentData = {
        ...data,
        trackingId: generateTrackingId(),
        status: "pending" as const,
        statusHistory: [
          {
            status: "pending" as const,
            notes: "Shipment created",
            timestamp: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Send to API
      const response = await fetch("/api/shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create shipment");
      }

      setCurrentShipment(result.shipment);

      toast({
        title: "Success!",
        description: `Shipment created successfully. Tracking ID: ${result.shipment.trackingId}`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create shipment";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <ShipmentForm onSubmit={handleShipmentSubmit} isLoading={isLoading} />

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
          {error}
        </div>
      )}

      {complianceAdvice && (
        <ComplianceResultCard complianceInformation={complianceAdvice} />
      )}

      {currentShipment && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Shipment Created</h2>
          <ShipmentTrackingCard shipment={currentShipment} />
        </div>
      )}
    </div>
  );
}
