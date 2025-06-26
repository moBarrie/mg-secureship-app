import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShipmentSuccessContent } from "@/components/shipment/ShipmentSuccessContent";

export default function ShipmentSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          }
        >
          <ShipmentSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
