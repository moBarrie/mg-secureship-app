"use client";

import type { Shipment } from "@/types/shipment";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Trash2, ArrowUpRightFromSquare } from "lucide-react";

interface SavedShipmentCardProps {
  shipment: Shipment;
  onUse: (shipment: Shipment) => void;
  onDelete: (shipmentId: string) => void;
}

export function SavedShipmentCard({ shipment, onUse, onDelete }: SavedShipmentCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
           <CardTitle className="text-lg font-headline flex items-center">
             <Package className="mr-2 h-5 w-5 text-primary" />
             {shipment.mineralType}
           </CardTitle>
           {shipment.savedAt && (
             <CardDescription className="text-xs">
               Saved: {new Date(shipment.savedAt).toLocaleDateString()}
             </CardDescription>
           )}
        </div>
        <CardDescription>
          {shipment.quantity} to {shipment.destination} (Origin: {shipment.origin})
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" size="sm" onClick={() => onUse(shipment)} aria-label={`Use shipment details for ${shipment.mineralType}`}>
          <ArrowUpRightFromSquare className="mr-1.5 h-4 w-4" /> Use
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(shipment.id)} aria-label={`Delete saved shipment for ${shipment.mineralType}`}>
          <Trash2 className="mr-1.5 h-4 w-4" /> Delete
        </Button>
      </CardContent>
    </Card>
  );
}
