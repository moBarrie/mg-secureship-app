"use client";

import * as React from "react";
import type { ShipmentInput } from "@/types/shipment";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PackageSearch, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  senderName: z.string().min(2, "Sender name must be at least 2 characters"),
  senderEmail: z.string().email("Invalid sender email"),
  receiverName: z
    .string()
    .min(2, "Receiver name must be at least 2 characters"),
  receiverEmail: z.string().email("Invalid receiver email"),
  parcelType: z.string().min(2, "Parcel type must be at least 2 characters"),
  weight: z.string().min(1, "Weight is required"),
  value: z.string().min(1, "Value is required"),
  origin: z.string().min(2, "Origin must be at least 2 characters"),
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  notes: z.string().optional(),
});

interface ShipmentFormProps {
  onSubmit: (data: ShipmentInput) => void;
  isLoading: boolean;
  initialData?: Partial<ShipmentInput>;
}

export function ShipmentForm({
  onSubmit,
  isLoading,
  initialData,
}: ShipmentFormProps) {
  const form = useForm<ShipmentInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: initialData?.senderName || "",
      senderEmail: initialData?.senderEmail || "",
      receiverName: initialData?.receiverName || "",
      receiverEmail: initialData?.receiverEmail || "",
      parcelType: initialData?.parcelType || "",
      weight: initialData?.weight || "",
      value: initialData?.value || "",
      origin: initialData?.origin || "Sierra Leone", // Default origin
      destination: initialData?.destination || "",
      notes: initialData?.notes || "",
    },
  });

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle>New Shipment</CardTitle>
        <CardDescription>
          Enter the shipment details below to create a new shipment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter sender's name" {...field} />
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
                      <FormLabel>Sender Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter sender's email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="receiverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter receiver's name" {...field} />
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
                      <FormLabel>Receiver Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter receiver's email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="parcelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Gold, Diamond" {...field} />
                    </FormControl>
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
                      <Input placeholder="e.g., 100g, 2kg" {...field} />
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
                      <Input placeholder="e.g., $1000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <Input placeholder="Origin country" {...field} disabled />
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
                      <Input placeholder="Destination country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special instructions or notes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                "Creating Shipment..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Create Shipment
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
