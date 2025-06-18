"use client";

import type {
  Shipment,
  ShipmentStatus,
  StatusHistoryEntry,
} from "@/types/shipment";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  Package,
  CheckCircle2,
  AlertTriangle,
  Clock,
  CircleDotDashedIcon,
} from "lucide-react";
import { useMemo } from "react";

interface ShipmentTrackingCardProps {
  shipment: Shipment;
  className?: string;
}

const statusIcons: Record<ShipmentStatus, React.ElementType> = {
  pending: Clock,
  processing: Clock,
  in_transit: Truck,
  out_for_delivery: Package,
  delivered: CheckCircle2,
  on_hold: AlertTriangle,
};

const statusColors: Record<ShipmentStatus, string> = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  in_transit: "bg-primary",
  out_for_delivery: "bg-yellow-500",
  delivered: "bg-green-600",
  on_hold: "bg-red-500",
};

const statusDisplay: Record<ShipmentStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  on_hold: "On Hold",
};

export function ShipmentTrackingCard({
  shipment,
  className = "",
}: ShipmentTrackingCardProps) {
  const Icon = useMemo(
    () => statusIcons[shipment.status] || Package,
    [shipment.status]
  );
  const statusColor = useMemo(
    () => statusColors[shipment.status] || "bg-gray-500",
    [shipment.status]
  );
  const displayStatus = useMemo(
    () => statusDisplay[shipment.status] || "Unknown",
    [shipment.status]
  );

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Shipment Details</CardTitle>
            <CardDescription>
              Tracking ID: {shipment.trackingId}
            </CardDescription>
          </div>
          <Badge className={statusColor}>
            <Icon className="w-4 h-4 mr-2" />
            {displayStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Sender
            </h4>
            <p className="mt-1">{shipment.senderName}</p>
            <p className="text-sm text-muted-foreground">
              {shipment.senderEmail}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Receiver
            </h4>
            <p className="mt-1">{shipment.receiverName}</p>
            <p className="text-sm text-muted-foreground">
              {shipment.receiverEmail}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">From</h4>
            <p className="mt-1">{shipment.origin || "N/A"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">To</h4>
            <p className="mt-1">{shipment.destination || "N/A"}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Parcel Type
            </h4>
            <p className="mt-1">{shipment.parcelType}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Weight
            </h4>
            <p className="mt-1">{shipment.weight}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Value</h4>
            <p className="mt-1">{shipment.value}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Shipment Updates
          </h4>
          <div className="space-y-4">
            {shipment.statusHistory?.map(
              (update: StatusHistoryEntry, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        index === 0 ? statusColor : "bg-muted"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {statusDisplay[update.status]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(update.timestamp).toLocaleString()}
                    </p>
                    {update.notes && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {update.notes}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
