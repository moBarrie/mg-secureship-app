"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const parcelDetailsSchema = z.object({
  senderName: z.string().min(2, { message: "Sender name is required" }),
  senderEmail: z.string().email({ message: "Please enter a valid email" }),
  senderPhone: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),
  receiverName: z.string().min(2, { message: "Recipient name is required" }),
  receiverEmail: z.string().email({ message: "Please enter a valid email" }),
  receiverPhone: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),
  parcelType: z.string().min(1, { message: "Please select parcel type" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  value: z.string().min(1, { message: "Declared value is required" }),
  destination: z.string().min(2, { message: "Destination is required" }),
  notes: z.string().optional(),
});

type ParcelDetailsValues = z.infer<typeof parcelDetailsSchema>;

export function ParcelDetailsForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ParcelDetailsValues>({
    resolver: zodResolver(parcelDetailsSchema),
    defaultValues: {
      senderName: "",
      senderEmail: "",
      senderPhone: "",
      receiverName: "",
      receiverEmail: "",
      receiverPhone: "",
      parcelType: "",
      weight: "",
      value: "",
      destination: "",
      notes: "",
    },
  });

  const onSubmit = async (data: ParcelDetailsValues) => {
    setIsLoading(true);
    try {
      // Prepare the data according to the API schema
      const shipmentData = {
        senderName: data.senderName,
        senderEmail: data.senderEmail,
        receiverName: data.receiverName,
        receiverEmail: data.receiverEmail,
        parcelType: data.parcelType,
        weight: data.weight,
        value: data.value,
        destination: data.destination,
        notes: data.notes,
        origin: "Sierra Leone", // Hardcoded as per requirement
      };

      const response = await fetch("/api/shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create shipment");
      }

      toast({
        title: "Shipment Created!",
        description: `Your tracking ID is: ${result.trackingId}. Please save this for future reference.`,
      });

      // Reset form
      form.reset();

      // Redirect to tracking page
      router.push(`/track?id=${result.trackingId}`);
    } catch (error) {
      console.error("Error creating shipment:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create shipment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Sender Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sender Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="senderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senderEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senderPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Receiver Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Receiver Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="receiverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiverEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jane@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiverPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Parcel Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Parcel Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="parcelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Minerals</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mineral type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="diamond">Diamond</SelectItem>
                      <SelectItem value="other">
                        Other Precious Minerals
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter weight" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Declared Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter destination" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Additional Details */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special handling instructions or additional information"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Shipment...
            </span>
          ) : (
            "Create Shipment"
          )}
        </Button>
      </form>
    </Form>
  );
}
