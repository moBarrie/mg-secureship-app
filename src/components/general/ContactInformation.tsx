import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

const offices = [
  {
    name: "Sierra Leone Office",
    address: "123 Freetown Road, Freetown, Sierra Leone",
    phone: "+232 12 345 678",
    email: "sl.office@mgsecureship.com",
  },
  {
    name: "London Office",
    address: "456 The City Plaza, London, UK",
    phone: "+44 20 7123 4567",
    email: "uk.office@mgsecureship.com",
  },
];

export function ContactInformation() {
  return (
    <section id="contact" className="py-12 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {offices.map((office) => (
            <Card key={office.name} className="shadow-lg overflow-hidden">
              <CardHeader className="bg-secondary/50">
                <CardTitle className="flex items-center text-xl text-secondary-foreground">
                  <Building2 className="mr-3 h-6 w-6 text-primary" />
                  {office.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3 text-sm">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-accent mt-1 shrink-0" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-accent shrink-0" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-accent shrink-0" />
                  <a href={`mailto:${office.email}`} className="hover:text-accent transition-colors">
                    {office.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
