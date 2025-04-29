"use client";

import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeft } from "lucide-react";

const formSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: "Customer name must be at least 2 characters." }),
  productName: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." }),
  quantity: z.coerce
    .number()
    .int()
    .positive({ message: "Quantity must be a positive number." }),
  pricePerProduct: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." })
    .transform((val) => Number.parseFloat(val.toFixed(2))), // Format to 2 decimal places
});

export type SaleItem = {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  pricePerProduct: number;
  date: string;
};

type SalesFormProps = {
  onBack: () => void;
  onSubmit: (data: SaleItem) => void;
  editItem?: SaleItem | null;
};

export function SalesForm({
  onBack,
  onSubmit,
  editItem = null,
}: SalesFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!editItem;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      productName: "",
      quantity: undefined,
      pricePerProduct: undefined,
    },
  });

  // Pre-fill form when in edit mode
  useEffect(() => {
    if (editItem) {
      form.reset({
        customerName: editItem.customerName,
        productName: editItem.productName,
        quantity: editItem.quantity,
        pricePerProduct: editItem.pricePerProduct,
      });
    }
  }, [editItem, form]);

  function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // If editing, keep the original ID and date
    // If adding new, generate new ID and current date
    const submittedItem: SaleItem = isEditMode
      ? {
          ...editItem!,
          customerName: values.customerName,
          productName: values.productName,
          quantity: values.quantity,
          pricePerProduct: values.pricePerProduct,
        }
      : {
          id: Date.now(), // Use timestamp as temporary ID
          customerName: values.customerName,
          productName: values.productName,
          quantity: values.quantity,
          pricePerProduct: values.pricePerProduct,
          date: new Date().toISOString(),
        };

    // Simulate API call
    setTimeout(() => {
      onSubmit(submittedItem);
      setIsSubmitting(false);
      form.reset();
      onBack();
    }, 500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="mb-2 p-0 h-auto bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive rounded-md"
          aria-label="Back"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter customer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
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
              <FormLabel>Quantity Sold</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  {...field}
                  onChange={(e) => {
                    // Ensure only positive integers
                    const value = Number.parseInt(e.target.value);
                    if (!isNaN(value) && value >= 0) {
                      field.onChange(value);
                    } else if (e.target.value === "") {
                      field.onChange(e.target.value);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricePerProduct"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Per Product</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter price per product"
                  {...field}
                  onChange={(e) => {
                    // Allow decimal values for price
                    const value = Number.parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0) {
                      field.onChange(value);
                    } else if (e.target.value === "") {
                      field.onChange(e.target.value);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isEditMode
              ? "Update Sale"
              : "Add Sale"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
