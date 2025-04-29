"use client";

import {
  Calendar,
  Download,
  Pencil,
  Search,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

import { SalesForm, type SaleItem } from "@/components/forms/SalesForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Updated mock data with new structure
const initialSalesData: SaleItem[] = [
  {
    id: 1,
    customerName: "John Doe",
    productName: "Laptop Pro",
    quantity: 2,
    pricePerProduct: 299.99,
    date: "2023-04-15T10:30:00",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    productName: "Wireless Headphones",
    quantity: 3,
    pricePerProduct: 49.99,
    date: "2023-04-16T14:45:00",
  },
  {
    id: 3,
    customerName: "Bob Johnson",
    productName: "Smart Watch",
    quantity: 1,
    pricePerProduct: 199.99,
    date: "2023-04-17T09:15:00",
  },
  {
    id: 4,
    customerName: "Alice Brown",
    productName: "Phone Case",
    quantity: 4,
    pricePerProduct: 19.99,
    date: "2023-04-18T16:30:00",
  },
  {
    id: 5,
    customerName: "Charlie Wilson",
    productName: "Bluetooth Speaker",
    quantity: 1,
    pricePerProduct: 89.99,
    date: "2023-04-19T11:20:00",
  },
];

export function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [salesData, setSalesData] = useState<SaleItem[]>(initialSalesData);
  const [editingItem, setEditingItem] = useState<SaleItem | null>(null);

  // Sort items by date (newest first) and filter by search term
  const sortedAndFilteredSales = [...salesData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter(
      (sale) =>
        sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Calculate total sales amount
  const totalSales = salesData.reduce(
    (total, sale) => total + sale.quantity * sale.pricePerProduct,
    0
  );

  // Calculate average order value
  // const averageOrderValue = totalSales / salesData.length || 0;

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      setSalesData(salesData.filter((item) => item.id !== itemToDelete));
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleEditClick = (item: SaleItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormSubmit = (item: SaleItem) => {
    if (editingItem) {
      // Update existing item
      setSalesData(
        salesData.map((saleItem) => (saleItem.id === item.id ? item : saleItem))
      );
      setEditingItem(null);
    } else {
      // Add new item
      setSalesData([...salesData, item]);
    }
  };

  const handleBackFromForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Sales Management</h1>
        <Button onClick={() => setShowForm(true)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          New Sale
        </Button>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? "Edit Sale" : "New Sale"}</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesForm
              onBack={handleBackFromForm}
              onSubmit={handleFormSubmit}
              editItem={editingItem}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-green-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ৳{totalSales.toFixed(2)}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p> */}
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Order Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ৳{averageOrderValue.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +2% from last month
                </p>
              </CardContent>
            </Card> */}

            <Card className="bg-blue-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Products Sold
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {salesData.reduce((total, sale) => total + sale.quantity, 0)}
                </div>
                <p className="text-xs text-muted">
                  Across {salesData.length} orders
                </p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Customers
                </CardTitle>
                <Users className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(salesData.map((sale) => sale.customerName)).size}
                </div>
                <p className="text-xs text-muted">Unique customers</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by customer or product..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Filter by Date
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead className="w-[80px]">Serial</TableHead>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price Per Product</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedAndFilteredSales.map((sale, index) => (
                      <TableRow key={sale.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {sale.customerName}
                        </TableCell>
                        <TableCell>{sale.productName}</TableCell>
                        <TableCell>{sale.quantity}</TableCell>
                        <TableCell>
                          ৳{sale.pricePerProduct.toFixed(2)}
                        </TableCell>
                        <TableCell className="font-medium">
                          ৳{(sale.quantity * sale.pricePerProduct).toFixed(2)}
                        </TableCell>
                        <TableCell>{formatDate(sale.date)}</TableCell>
                        <TableCell className="text-right">
                          <TooltipProvider>
                            <div className="flex justify-end gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleEditClick(sale)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit sale</p>
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDeleteClick(sale.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete sale</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                    {sortedAndFilteredSales.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this sale record? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
