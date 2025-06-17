import type { Shipment, ShipmentStatus } from "@/types/shipment";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, CheckCircle2, AlertTriangle, Clock, CircleDotDashedIcon } from "lucide-react";

interface ShipmentTrackingCardProps {
  shipment: Shipment;
}

const statusIcons: Record<ShipmentStatus, React.ElementType> = {
  Processing: Clock,
  "In Transit": Truck,
  "Out for Delivery": Package,
  Delivered: CheckCircle2,
  Delayed: AlertTriangle,
  "Awaiting Info": CircleDotDashedIcon,
};

const statusColors: Record<ShipmentStatus, string> = {
  Processing: "bg-blue-500",
  "In Transit": "bg-primary",
  "Out for Delivery": "bg-yellow-500",
  Delivered: "bg-green-600",
  Delayed: "bg-red-500",
  "Awaiting Info": "bg-gray-500",
};


export function ShipmentTrackingCard({ shipment }: ShipmentTrackingCardProps) {
  const Icon = statusIcons[shipment.status || "Awaiting Info"] || Package;
  const badgeColor = statusColors[shipment.status || "Awaiting Info"] || "bg-gray-500";

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-headline">
              {shipment.mineralType} - {shipment.quantity}
            </CardTitle>
            <CardDescription>To: {shipment.destination} (Origin: {shipment.origin})</CardDescription>
          </div>
          {shipment.status && (
             <Badge className={`${badgeColor} text-white`}>
              <Icon className="mr-1.5 h-3.5 w-3.5" />
              {shipment.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {shipment.trackingId && (
            <p className="text-sm text-muted-foreground">Tracking ID: <span className="font-medium text-foreground">{shipment.trackingId}</span></p>
        )}
        {shipment.complianceAdvice && (
          <details className="mt-2 text-xs">
            <summary className="cursor-pointer text-accent hover:underline">View Compliance Summary</summary>
            <p className="mt-1 p-2 border rounded-md bg-muted/30 max-h-20 overflow-y-auto">{shipment.complianceAdvice.substring(0,150)}...</p>
          </details>
        )}
      </CardContent>
    </Card>
  );
}
