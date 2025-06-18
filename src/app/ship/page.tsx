"use client";

import { ParcelDetailsForm } from "@/components/general/ParcelDetailsForm";

export default function ShipmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-4">
              Create New Shipment
            </h1>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Fill in the details below to create a new shipment. You will
              receive a tracking number once the shipment is created.
            </p>
            <div className="max-w-4xl mx-auto">
              <div className="bg-card p-6 rounded-lg shadow-lg">
                <ParcelDetailsForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
