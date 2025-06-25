"use client";

import { Button } from "./button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function WhatsAppButton({
  phoneNumber = "+447903440895", // Set default business number
  message = "Hello! I would like to inquire about your shipping services.",
  className,
  variant = "default",
}: WhatsAppButtonProps) {
  // Format phone number to WhatsApp's required format (remove +, keep country code)
  const cleanPhoneNumber = phoneNumber.startsWith("+")
    ? phoneNumber.substring(1)
    : phoneNumber;

  const handleClick = () => {
    // Create WhatsApp URL with phone number and pre-filled message
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    // Open in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      className={`flex items-center gap-2 ${
        variant === "default"
          ? "bg-[#25D366] hover:bg-[#20BD5B] text-white hover:text-white"
          : ""
      } ${className || ""}`}
    >
      <MessageCircle className="w-5 h-5" />
      WhatsApp Us
    </Button>
  );
}
