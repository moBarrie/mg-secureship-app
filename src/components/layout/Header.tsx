import { ShipIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-3 group">
          <ShipIcon className="h-10 w-10 text-accent transition-transform duration-300 group-hover:scale-110" />
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            M&amp;G SecureShip
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/ship">
            <Button
              variant="secondary"
              size="lg"
              className="font-semibold px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 rounded-full"
            >
              Ship Now
            </Button>
          </Link>
          <p className="text-sm text-primary-foreground/80 hidden lg:block font-medium">
            Trusted Global Mineral Logistics
          </p>
        </div>
      </div>
    </header>
  );
}
