"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  src: string;
  alt: string;
  title: string;
  objectFit?: "cover" | "contain";
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

export function Carousel({
  items,
  autoPlay = true,
  autoPlayDelay = 5000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayDelay, items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-xl shadow-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="relative group bg-muted/30">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1200}
                  height={600}
                  className={`w-full h-[400px] md:h-[500px] object-${
                    item.objectFit || "contain"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                  <h3 className="text-white text-2xl md:text-3xl font-bold px-4 text-center">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
