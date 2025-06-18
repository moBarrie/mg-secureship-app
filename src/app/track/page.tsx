"use client";

import { ShipmentTrackingSection } from "@/components/sections/ShipmentTrackingSection";

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">
              Track Your Shipment
            </h1>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Enter your tracking number below to get real-time updates on your
              shipment status and location.
            </p>
            <div className="max-w-2xl mx-auto">
              <ShipmentTrackingSection />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
