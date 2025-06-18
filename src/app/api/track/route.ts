import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Shipment } from "@/models/Shipment";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingId = searchParams.get('trackingId');

    if (!trackingId) {
      return NextResponse.json({
        success: false,
        message: "Tracking ID is required"
      }, { status: 400 });
    }

    // Connect to database
    await dbConnect();

    // Find shipment in MongoDB
    const foundShipment = await Shipment.findOne({ trackingId: trackingId.trim() });

    if (foundShipment) {
      return NextResponse.json({
        success: true,
        shipment: foundShipment
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No shipment found with this tracking ID"
      }, { status: 404 });
    }

  } catch (error) {
    console.error('Error tracking shipment:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to track shipment"
    }, { status: 500 });
  }
}
