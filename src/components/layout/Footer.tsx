
import { ContactInformation } from "@/components/general/ContactInformation";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/50">
      <ContactFormSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-8 md:my-12" />
      </div>
      <ContactInformation />
      <div className="text-center py-6 text-sm text-muted-foreground mt-8">
        <p>&copy; {new Date().getFullYear()} M&G SecureShip. All rights reserved.</p>
        <p>Secure & Compliant Mineral Transport Specialists.</p>
      </div>
    </footer>
  );
}
