"use client";

import type { Shipment, ShipmentInput } from "@/types/shipment";
import { SavedShipmentCard } from "./SavedShipmentCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Archive, PlusCircle } from "lucide-react";

interface SavedShipmentsSectionProps {
  onUseShipment: (shipmentDetails: ShipmentInput) => void;
  newlySavedShipment: Shipment | null; // To trigger re-fetch or update
}

const LOCAL_STORAGE_KEY = "globalAtlanticExpress_savedShipments";

export function SavedShipmentsSection({
  onUseShipment,
  newlySavedShipment,
}: SavedShipmentsSectionProps) {
  const [savedShipments, setSavedShipments] = useState<Shipment[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedShipments = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedShipments) {
        setSavedShipments(JSON.parse(storedShipments));
      }
    } catch (error) {
      console.error("Failed to load saved shipments from localStorage:", error);
      toast({
        title: "Error",
        description: "Could not load saved shipments.",
        variant: "destructive",
      });
    }
  }, [newlySavedShipment, toast]); // Re-fetch when a new shipment is saved

  const handleUseShipment = (shipment: Shipment) => {
    onUseShipment({
      senderName: shipment.senderName,
      senderEmail: shipment.senderEmail,
      senderPhone: shipment.senderPhone,
      receiverName: shipment.receiverName,
      receiverEmail: shipment.receiverEmail,
      receiverPhone: shipment.receiverPhone,
      parcelType: shipment.parcelType,
      weight: shipment.weight,
      value: shipment.value,
      origin: shipment.origin,
      destination: shipment.destination,
      notes: shipment.notes,
    });
    toast({
      title: "Shipment Loaded",
      description: `Details for ${shipment.parcelType} to ${shipment.destination} loaded into the form.`,
    });
  };

  const handleDeleteShipment = (shipmentTrackingId: string) => {
    try {
      const updatedShipments = savedShipments.filter(
        (s) => s.trackingId !== shipmentTrackingId
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedShipments));
      setSavedShipments(updatedShipments);
      toast({
        title: "Shipment Deleted",
        description: "The saved shipment has been removed.",
      });
    } catch (error) {
      console.error("Failed to delete shipment from localStorage:", error);
      toast({
        title: "Error",
        description: "Could not delete the shipment.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="saved-shipments" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary flex items-center justify-center">
          <Archive className="mr-3 h-8 w-8" />
          Saved Shipments
        </h2>
        {savedShipments.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p className="mb-4">You have no saved shipments yet.</p>
            <p>Shipments you save for future use will appear here.</p>
            <Button
              variant="ghost"
              className="mt-4 text-accent hover:text-accent/90"
              onClick={() =>
                document
                  .getElementById("new-shipment-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Create a New Shipment
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedShipments.map((shipment) => (
              <SavedShipmentCard
                key={shipment.trackingId}
                shipment={shipment}
                onUse={() => handleUseShipment(shipment)}
                onDelete={() => handleDeleteShipment(shipment.trackingId)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
