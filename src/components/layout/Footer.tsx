import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted">
      <ContactFormSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <p className="text-muted-foreground">
              Your trusted partner for secure and compliant mineral transport
              from Sierra Leone to the world.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#new-shipment-form"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  New Shipment
                </a>
              </li>
              <li>
                <a
                  href="#contact-form"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Freetown, Sierra Leone</p>
              <p>10 William Street</p>
              <p>Email: medalbarrie@gmail.com</p>
              <p>Tel: +232 7X XXX XXX</p>
            </div>
          </div>
        </div>
        <div className="text-center py-6 text-sm text-muted-foreground border-t border-border/50 mt-8">
          <p>
            &copy; {new Date().getFullYear()} M&amp;G SecureShip. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
