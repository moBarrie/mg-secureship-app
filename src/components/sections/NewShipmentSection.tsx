"use client";

import type { ComplianceInformationInput } from "@/ai/flows/compliance-advisor";
import type { ShipmentInput } from "@/types/shipment";
import { getComplianceInformation } from "@/ai/flows/compliance-advisor";
import { useState } from "react";
import { ShipmentForm } from "@/components/shipment/ShipmentForm";
import { ComplianceResultCard } from "@/components/shipment/ComplianceResultCard";
import { useToast } from "@/hooks/use-toast";

export function NewShipmentSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [complianceAdvice, setComplianceAdvice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentShipmentDetails, setCurrentShipmentDetails] =
    useState<ShipmentInput | null>(null);
  const { toast } = useToast();

  const handleShipmentSubmit = async (data: ShipmentInput) => {
    setIsLoading(true);
    setError(null);
    setComplianceAdvice(null);
    setCurrentShipmentDetails(data);

    const input: ComplianceInformationInput = {
      ...data,
      origin: "Sierra Leone", // Hardcoded as per requirement
    };

    try {
      const result = await getComplianceInformation(input);
      setComplianceAdvice(result.complianceInformation);
    } catch (e) {
      console.error("Error getting compliance information:", e);
      setError("Failed to retrieve compliance information. Please try again.");
      toast({
        title: "Compliance Check Failed",
        description:
          "Could not get compliance advice. Check your connection or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="new-shipment-form" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            New Shipment
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Fill out the form below to get instant compliance information for
            your shipment.
          </p>
          <ShipmentForm isLoading={isLoading} onSubmit={handleShipmentSubmit} />
          {error && (
            <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}
          {(complianceAdvice || error || isLoading) && (
            <ComplianceResultCard
              advice={complianceAdvice}
              isLoading={isLoading}
              error={error}
              shipmentDetails={{
                mineralType: currentShipmentDetails?.mineralType || "",
                quantity: currentShipmentDetails?.quantity || "",
                destination: currentShipmentDetails?.destination || "",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
