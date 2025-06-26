"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  Copy,
  Package,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export function ShipmentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [trackingId, setTrackingId] = useState<string>("");

  useEffect(() => {
    const id = searchParams.get("trackingId");
    if (id) {
      setTrackingId(id);
    }
  }, [searchParams]);

  const copyTrackingId = async () => {
    try {
      await navigator.clipboard.writeText(trackingId);
      toast({
        title: "Copied!",
        description: "Tracking ID copied to clipboard",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the tracking ID manually",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const goToTracking = () => {
    router.push(`/track?id=${trackingId}`);
  };

  if (!trackingId) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-destructive mb-4">
              No Tracking Information
            </h2>
            <p className="text-muted-foreground mb-6">
              It looks like you arrived at this page without creating a
              shipment.
            </p>
            <Button onClick={() => router.push("/ship")} className="mr-4">
              Create New Shipment
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-green-600 mb-2">
          Shipment Created Successfully!
        </h1>
        <p className="text-xl text-muted-foreground">
          Your precious minerals are now ready for secure transport
        </p>
      </div>

      {/* Main Content Card */}
      <Card className="mb-8 border-green-200 shadow-lg">
        <CardHeader className="bg-green-50 border-b border-green-200">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Package className="h-6 w-6" />
            Shipment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* Tracking ID Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Tracking ID</h3>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Active
              </Badge>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg border-2 border-dashed border-primary/30 mb-4">
              <p className="text-3xl font-mono font-bold text-center text-primary tracking-wider">
                {trackingId}
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={copyTrackingId}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Tracking ID
              </Button>
              <Button
                onClick={goToTracking}
                className="flex items-center gap-2"
              >
                Track Shipment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">
                  Important: Save Your Tracking ID
                </h4>
                <ul className="text-amber-700 space-y-1 text-sm">
                  <li>
                    • <strong>Write it down</strong> or take a screenshot of
                    this page
                  </li>
                  <li>
                    • <strong>Bookmark this page</strong> for easy access
                  </li>
                  <li>
                    • <strong>Share it with the recipient</strong> so they can
                    track the shipment
                  </li>
                  <li>
                    • You will need this ID to track your shipment and for any
                    inquiries
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold">Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Our team will review your shipment details and begin
                  processing within 24 hours.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold">Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  All required compliance documentation will be prepared and
                  verified.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold">Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  Your shipment will be collected and transported via our secure
                  logistics network.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold">Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Track your shipment in real-time until it reaches its
                  destination safely.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center mt-8">
        <Button variant="outline" onClick={() => router.push("/ship")}>
          Create Another Shipment
        </Button>
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
