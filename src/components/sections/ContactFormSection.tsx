"use client";

import { ContactForm } from "@/components/general/ContactForm";
import Image from "next/image";

export function ContactFormSection() {
  return (
    <section id="contact-form" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/vault.jpeg"
          alt="Background"
          fill
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-background/95" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our services? We&apos;re here to help. Contact
            us for secure shipping solutions and expert assistance.
          </p>
        </div>
        <div className="max-w-2xl mx-auto relative">
          <div className="bg-background/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-border/50">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
