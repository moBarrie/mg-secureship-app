import { ShipIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <ShipIcon className="h-10 w-10 text-accent" />
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            M&amp;G SecureShip
          </h1>
        </div>
        <p className="text-sm text-primary-foreground/80 hidden md:block">
          Trusted Global Mineral Logistics
        </p>
      </div>
    </header>
  );
}
