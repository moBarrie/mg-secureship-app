"use client";

import type { Shipment } from "@/types/shipment";
import { ShipmentTrackingCard } from "./ShipmentTrackingCard";
import { useEffect, useState } from "react";
import { ListChecks } from "lucide-react";

const mockShipments: Shipment[] = [
  {
    id: "1",
    mineralType: "Gold Bars",
    quantity: "10 kg",
    origin: "Sierra Leone",
    destination: "Dubai, UAE",
    status: "In Transit",
    trackingId: "MGS123456789AE",
    complianceAdvice: "Ensure all export licenses from Sierra Leone are current. Dubai customs require detailed purity certification. Standard Kimberly Process certificates apply.",
  },
  {
    id: "2",
    mineralType: "Rough Diamonds",
    quantity: "500 carats",
    origin: "Sierra Leone",
    destination: "Antwerp, Belgium",
    status: "Processing",
    trackingId: "MGS987654321BE",
    complianceAdvice: "Kimberly Process Certification Scheme (KPCS) mandatory. Belgium requires import declaration B.I.E.C. 24/7. Anti-money laundering checks are stringent.",
  },
  {
    id: "3",
    mineralType: "Platinum Ore",
    quantity: "5 Tonnes",
    origin: "Sierra Leone",
    destination: "Tokyo, Japan",
    status: "Delivered",
    trackingId: "MGS555000111JP",
    complianceAdvice: "Japanese import regulations for industrial platinum are strict regarding conflict minerals. Ensure certificate of origin is notarized. Specific HS codes must be used.",
  },
];

export function ShipmentTrackingSection() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setShipments(mockShipments);
  }, []);

  if (shipments.length === 0) {
    return (
      <section id="tracking" className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary flex items-center justify-center">
            <ListChecks className="mr-3 h-8 w-8" />
            Track Your Shipments
          </h2>
          <p className="text-center text-muted-foreground">No active shipments to display currently.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="tracking" className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary flex items-center justify-center">
          <ListChecks className="mr-3 h-8 w-8" />
          Track Your Shipments
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments.map((shipment) => (
            <ShipmentTrackingCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
      </div>
    </section>
  );
}
