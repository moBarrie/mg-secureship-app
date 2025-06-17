"use client";

import { ContactForm } from "@/components/general/ContactForm";
import { ContactInformation } from "@/components/general/ContactInformation";

export function ContactFormSection() {
  return (
    <section id="contact-form" className="py-16 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our services? We&apos;re here to help. Contact
            us for secure shipping solutions and expert assistance.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-background rounded-xl shadow-lg p-8">
            <ContactForm />
          </div>
          <div className="flex flex-col justify-center">
            <ContactInformation />
          </div>
        </div>
      </div>
    </section>
  );
}
