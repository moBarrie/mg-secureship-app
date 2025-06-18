"use client";

import type { ComplianceInformationInput } from "@/ai/flows/compliance-advisor";
import type { Shipment, ShipmentInput } from "@/types/shipment";
import { getComplianceInformation } from "@/ai/flows/compliance-advisor";
import { useState } from "react";
import { ShipmentForm } from "@/components/shipment/ShipmentForm";
import { ComplianceResultCard } from "@/components/shipment/ComplianceResultCard";
import { ShipmentTrackingCard } from "@/components/shipment/ShipmentTrackingCard";
import { useToast } from "@/hooks/use-toast";

// Generate a random tracking ID
function generateTrackingId() {
  return `SL${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
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

    const newShipment: Shipment = {
      ...data,
      id: Math.random().toString(36).substring(2),
      origin: "Sierra Leone",
      trackingId: generateTrackingId(),
      status: "Processing",
      savedAt: Date.now(),
    };

    setCurrentShipment(newShipment);

    const input: ComplianceInformationInput = {
      ...data,
      origin: "Sierra Leone",
    };

    try {
      const result = await getComplianceInformation(input);
      setComplianceAdvice(result.complianceInformation);
      
      // Update shipment with compliance advice
      setCurrentShipment(prev => prev ? {
        ...prev,
        complianceAdvice: result.complianceInformation
      } : null);

      // Save shipment to local storage
      const savedShipments = JSON.parse(localStorage.getItem("shipments") || "[]");
      localStorage.setItem("shipments", JSON.stringify([
        ...savedShipments,
        {
          ...newShipment,
          complianceAdvice: result.complianceInformation
        }
      ]));

      toast({
        title: "Shipment Created",
        description: `Tracking ID: ${newShipment.trackingId}`,
      });
    } catch (e) {
      console.error("Error processing shipment:", e);
      setError("Failed to process shipment. Please try again.");
      toast({
        title: "Shipment Processing Failed",
        description: "Could not process your shipment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="new-shipment-form" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              New Shipment
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below to create a new shipment and get instant compliance information.
            </p>
          </div>

          <ShipmentForm isLoading={isLoading} onSubmit={handleShipmentSubmit} />
          
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}

          {currentShipment && (
            <div className="space-y-6">
              <ShipmentTrackingCard shipment={currentShipment} />
              {complianceAdvice && (
                <ComplianceResultCard
                  advice={complianceAdvice}
                  isLoading={isLoading}
                  error={error}
                  shipmentDetails={{
                    mineralType: currentShipment.mineralType,
                    quantity: currentShipment.quantity,
                    destination: currentShipment.destination,
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
