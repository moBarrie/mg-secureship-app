"use client";

import type { ComplianceInformationInput } from "@/ai/flows/compliance-advisor";
import type { Shipment, ShipmentInput } from "@/types/shipment";
import { getComplianceInformation } from "@/ai/flows/compliance-advisor";
import { useState } from "react";
import { ShipmentForm } from "@/components/shipment/ShipmentForm";
import { ComplianceResultCard } from "@/components/shipment/ComplianceResultCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const LOCAL_STORAGE_KEY = "mgSecureShip_savedShipments";

interface NewShipmentSectionProps {
  onShipmentSaved: (shipment: Shipment) => void;
  initialFormData?: ShipmentInput;
}

export function NewShipmentSection({ onShipmentSaved, initialFormData }: NewShipmentSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [complianceAdvice, setComplianceAdvice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentShipmentDetails, setCurrentShipmentDetails] = useState<ShipmentInput | null>(null);
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
        description: "Could not get compliance advice. Check your connection or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveShipment = () => {
    if (!currentShipmentDetails || !complianceAdvice) {
      toast({
        title: "Cannot Save Shipment",
        description: "Please submit shipment details and get compliance advice first.",
        variant: "destructive",
      });
      return;
    }

    const newShipment: Shipment = {
      id: crypto.randomUUID(),
      ...currentShipmentDetails,
      origin: "Sierra Leone",
      complianceAdvice: complianceAdvice,
      savedAt: Date.now(),
      status: "Awaiting Info" // Default status for a saved, non-submitted shipment
    };

    try {
      const storedShipmentsRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const storedShipments: Shipment[] = storedShipmentsRaw ? JSON.parse(storedShipmentsRaw) : [];
      storedShipments.push(newShipment);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedShipments));
      
      toast({
        title: "Shipment Saved",
        description: `${newShipment.mineralType} to ${newShipment.destination} has been saved.`,
      });
      onShipmentSaved(newShipment); // Notify parent
    } catch (error) {
      console.error("Failed to save shipment to localStorage:", error);
      toast({
        title: "Save Failed",
        description: "Could not save the shipment.",
        variant: "destructive",
      });
    }
  };


  return (
    <section id="new-shipment-form" className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <ShipmentForm onSubmit={handleShipmentSubmit} isLoading={isLoading} initialData={initialFormData} />
        {(complianceAdvice || isLoading || error) && (
          <ComplianceResultCard 
            advice={complianceAdvice} 
            isLoading={isLoading} 
            error={error}
            shipmentDetails={currentShipmentDetails ?? undefined}
          />
        )}
        {complianceAdvice && !error && !isLoading && (
          <div className="mt-6 text-center">
            <Button onClick={handleSaveShipment} variant="outline" className="text-primary border-primary hover:bg-primary/10">
              <Save className="mr-2 h-4 w-4" /> Save Shipment Details for Future Use
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
