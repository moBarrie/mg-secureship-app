"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShipmentTrackingCard } from "@/components/shipment/ShipmentTrackingCard";
import { PackageSearch } from "lucide-react";
import type { Shipment } from "@/types/shipment";
import { useToast } from "@/hooks/use-toast";

export function ShipmentTrackingSection() {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTrackingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShipment(null);

    try {
      const response = await fetch(
        `/api/track?trackingId=${encodeURIComponent(trackingId.trim())}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to track shipment");
      }

      if (data.success && data.shipment) {
        setShipment(data.shipment);
        toast({
          title: "Shipment Found",
          description: "Displaying tracking information for your shipment.",
        });
      } else {
        setError("No shipment found with this tracking ID.");
        toast({
          title: "Shipment Not Found",
          description: "Please check the tracking ID and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error tracking shipment:", error);
      setError(
        error instanceof Error ? error.message : "Failed to track shipment"
      );
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to track shipment",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="shipment-tracking" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Track Your Shipment
            </h2>
            <p className="text-muted-foreground">
              Enter your tracking ID below to see the current status of your
              shipment.
            </p>
          </div>

          <form onSubmit={handleTrackingSubmit} className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter tracking ID (e.g., SLAB123)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={!trackingId.trim()}>
                <PackageSearch className="mr-2 h-4 w-4" />
                Track
              </Button>
            </div>
          </form>

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}

          {shipment && <ShipmentTrackingCard shipment={shipment} />}
        </div>
      </div>
    </section>
  );
}
