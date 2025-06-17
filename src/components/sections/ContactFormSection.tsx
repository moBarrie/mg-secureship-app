
"use client";

import { ContactForm } from "@/components/general/ContactForm";

export function ContactFormSection() {
  return (
    <section id="contact-form" className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <ContactForm />
      </div>
    </section>
  );
}
