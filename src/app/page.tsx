"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 text-center bg-gradient-to-br from-primary/80 via-primary to-primary/90 text-primary-foreground overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23B4A175' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414zM41 18c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zM41 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">
              Secure. Compliant. Global.
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Your trusted partner for shipping precious minerals from Sierra
              Leone to the world. Fast, reliable, and fully compliant with
              international regulations.
            </p>

            <div className="flex justify-center gap-4 mb-12">
              <Link href="/track">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-full bg-accent hover:bg-accent/90"
                >
                  Track Your Shipment
                </Button>
              </Link>
            </div>

            {/* Hero Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center max-w-6xl mx-auto">
              <div className="relative group overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/images/image-1.jpeg"
                  alt="Premium shipping services"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-xl w-full h-[300px] object-cover transform transition-all duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl flex items-end justify-center pb-8">
                  <p className="text-white text-xl font-semibold px-4 text-center">
                    Premium Shipping Services
                  </p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/images/image-2.png"
                  alt="Global logistics network"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-xl w-full h-[300px] object-cover transform transition-all duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl flex items-end justify-center pb-8">
                  <p className="text-white text-xl font-semibold px-4 text-center">
                    Global Logistics Network
                  </p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/images/image-3.jpeg"
                  alt="Secure mineral transport"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-xl w-full h-[300px] object-cover transform transition-all duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl flex items-end justify-center pb-8">
                  <p className="text-white text-xl font-semibold px-4 text-center">
                    Secure Mineral Transport
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section with Backdrop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-8">
              <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg">
                <h3 className="text-4xl font-bold mb-2">500+</h3>
                <p className="text-sm text-primary-foreground/90">
                  Happy Clients
                </p>
              </div>
              <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg">
                <h3 className="text-4xl font-bold mb-2">100%</h3>
                <p className="text-sm text-primary-foreground/90">
                  Secure Deliveries
                </p>
              </div>
              <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg">
                <h3 className="text-4xl font-bold mb-2">50+</h3>
                <p className="text-sm text-primary-foreground/90">
                  Global Partners
                </p>
              </div>
              <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg">
                <h3 className="text-4xl font-bold mb-2">15+</h3>
                <p className="text-sm text-primary-foreground/90">
                  Years Experience
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section with Background Image */}
        <section className="relative py-24 bg-muted overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/images/cargo-plane.jpeg"
              alt="Background"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-background/95" />
          </div>
          <div className="container mx-auto px-4 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Premium Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-border/50">
                <div className="h-14 w-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure Shipping</h3>
                <p className="text-muted-foreground">
                  End-to-end secure logistics for your precious minerals with
                  real-time tracking and insurance.
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-border/50">
                <div className="h-14 w-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Compliance Management
                </h3>
                <p className="text-muted-foreground">
                  Full compliance with international regulations and
                  documentation handling.
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-border/50">
                <div className="h-14 w-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Storage Solutions
                </h3>
                <p className="text-muted-foreground">
                  Secure vaults and storage facilities for your valuable
                  minerals with 24/7 monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section with Image Background */}
        <section className="relative py-24 overflow-hidden">
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
          <div className="container mx-auto px-4 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl text-center group shadow-lg hover:shadow-xl transition-all">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Maximum Security</h3>
                <p className="text-muted-foreground">
                  State-of-the-art security protocols and insurance coverage for
                  your valuable shipments.
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl text-center group shadow-lg hover:shadow-xl transition-all">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Express shipping options with efficient customs clearance
                  processes.
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl text-center group shadow-lg hover:shadow-xl transition-all">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Global Network</h3>
                <p className="text-muted-foreground">
                  Extensive network of trusted partners worldwide ensuring
                  smooth operations.
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl text-center group shadow-lg hover:shadow-xl transition-all">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Round-the-clock customer support and shipment monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Services Gallery
            </h2>
            <Carousel
              items={[
                {
                  src: "/images/gold-shipping.jpeg",
                  alt: "Gold shipping and transport",
                  title: "Gold Shipping Services",
                },
                {
                  src: "/images/vault.jpeg",
                  alt: "Secure vault facility",
                  title: "Secure Storage Facilities",
                },
                {
                  src: "/images/cargo-plane.jpeg",
                  alt: "Cargo plane transport",
                  title: "Air Freight Services",
                },
                {
                  src: "/images/transport.jpeg",
                  alt: "Ground transport services",
                  title: "Ground Transport",
                },
                {
                  src: "/images/vault-gold.jpeg",
                  alt: "Gold storage facility",
                  title: "Precious Metal Storage",
                },
                {
                  src: "/images/image-4.jpeg",
                  alt: "Professional shipping services",
                  title: "Professional Services",
                },
                {
                  src: "/images/image-5.jpeg",
                  alt: "Global shipping solutions",
                  title: "Global Shipping Solutions",
                },
                {
                  src: "/images/image-6.jpeg",
                  alt: "Logistics operations",
                  title: "Logistics Operations",
                },
                {
                  src: "/images/image-7.jpeg",
                  alt: "International shipping",
                  title: "International Shipping",
                },
                {
                  src: "/images/image-8.jpeg",
                  alt: "Secure cargo handling",
                  title: "Secure Cargo Handling",
                },
                {
                  src: "/images/image-9.jpeg",
                  alt: "Maritime transport",
                  title: "Maritime Transport",
                },
                {
                  src: "/images/image-10.jpeg",
                  alt: "Warehouse operations",
                  title: "Warehouse Operations",
                },
                {
                  src: "/images/image-11.jpeg",
                  alt: "Supply chain management",
                  title: "Supply Chain Management",
                },
                {
                  src: "/images/image-12.jpeg",
                  alt: "Global network",
                  title: "Global Network",
                },
                {
                  src: "/images/image-13.jpeg",
                  alt: "Quality assurance",
                  title: "Quality Assurance",
                },
                {
                  src: "/images/image-14.jpeg",
                  alt: "Customer service",
                  title: "Customer Service",
                },
              ]}
              autoPlay={true}
              autoPlayDelay={4000}
            />
          </div>
        </section>

        {/* Testimonials Section with Transport Background */}
        <section className="relative py-24 bg-muted overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/images/transport.jpeg"
              alt="Background"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-background/95" />
          </div>
          <div className="container mx-auto px-4 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Mohammed Al-Rashid</h4>
                    <p className="text-sm text-muted-foreground">
                      Gold Trader, Dubai
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Exceptional service and security. Their attention to detail
                  and professional handling of our precious cargo exceeded our
                  expectations."
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Ibrahim Kamara</h4>
                    <p className="text-sm text-muted-foreground">
                      Diamond Exporter, Freetown
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I've been working with Global Atlantic Express for all my
                  diamond shipments. Their compliance expertise and secure
                  handling give me complete peace of mind."
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Victoria Bangura</h4>
                    <p className="text-sm text-muted-foreground">
                      Minerals Consultant, London
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Their global logistics network and understanding of
                  international shipping regulations make them the perfect
                  partner for our mineral transport needs."
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8 bg-border/70" />
      </main>
      <Footer />
    </div>
  );
}
