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
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <p className="text-muted-foreground mb-4">
              Reach out to us for secure shipping solutions and expert
              assistance with your valuable cargo.
            </p>
          </div>

          <div className="space-y-6">
            {offices.map((office) => (
              <Card key={office.name} className="shadow-lg overflow-hidden">
                <CardHeader className="bg-secondary/50">
                  <CardTitle className="flex items-center text-xl text-secondary-foreground">
                    <Building2 className="mr-3 h-6 w-6 text-primary" />
                    {office.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3 text-sm">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Our Location</h4>
                      <p className="text-muted-foreground">
                        Freetown, Sierra Leone
                        <br />
                        25 Liverpool Street
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email Us</h4>
                      <a
                        href="mailto:medalbarrie@gmail.com"
                        className="text-primary hover:underline"
                      >
                        medalbarrie@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Call Us</h4>
                      <p className="text-muted-foreground">
                        +232 7X XXX XXX
                        <br />
                        Mon - Fri, 9am - 6pm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours</h4>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
