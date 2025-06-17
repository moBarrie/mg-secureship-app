"use client";

import * as React from "react"; // Added this line
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PackageSearch, Send } from "lucide-react";

const formSchema = z.object({
  mineralType: z.string().min(2, "Mineral type must be at least 2 characters."),
  quantity: z.string().min(1, "Quantity is required."),
  destination: z.string().min(2, "Destination must be at least 2 characters."),
});

interface ShipmentFormProps {
  onSubmit: (data: ShipmentInput) => void;
  isLoading: boolean;
  initialData?: Partial<ShipmentInput>;
}

export function ShipmentForm({ onSubmit, isLoading, initialData }: ShipmentFormProps) {
  const form = useForm<ShipmentInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mineralType: initialData?.mineralType || "",
      quantity: initialData?.quantity || "",
      destination: initialData?.destination || "",
    },
  });

  React.useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <PackageSearch className="mr-3 h-7 w-7 text-primary" />
          New Shipment Details
        </CardTitle>
        <CardDescription>
          Enter the details of your precious mineral shipment. Origin is Sierra Leone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mineralType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mineral Type (e.g., Gold, Diamonds)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Raw Gold Dust" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (e.g., 1kg, 100 carats)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 500 grams" {...field} />
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
                  <FormLabel>Destination Country</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., United Kingdom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Get Compliance Advice & Proceed <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
