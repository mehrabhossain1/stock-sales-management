"use client";

import { useState } from "react";
import {
  LineChart,
  Pencil,
  PieChart,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StockForm, type StockItem } from "@/components/forms/NewStockForm";

// Updated mock data with dates
const initialStockItems: StockItem[] = [
  {
    id: 1,
    name: "Product A",
    quantity: 150,
    price: 299.99,
    date: "2023-04-15T10:30:00",
  },
  {
    id: 2,
    name: "Product B",
    quantity: 75,
    price: 499.99,
    date: "2023-04-18T14:45:00",
  },
  {
    id: 3,
    name: "Product C",
    quantity: 200,
    price: 49.99,
    date: "2023-04-20T09:15:00",
  },
  {
    id: 4,
    name: "Product D",
    quantity: 5,
    price: 999.99,
    date: "2023-04-22T16:30:00",
  },
  {
    id: 5,
    name: "Product E",
    quantity: 0,
    price: 9.99,
    date: "2023-04-25T11:20:00",
  },
];

export function StockPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [stockItems, setStockItems] = useState<StockItem[]>(initialStockItems);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);

  // Sort items by date (newest first) and filter by search term
  const sortedAndFilteredItems = [...stockItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Calculate total stock items (sum of all quantities)
  const totalStockItems = stockItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total value of inventory (sum of quantity * price for each item)
  const totalInventoryValue = stockItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Calculate average price per item
  // const averagePrice =
  //   stockItems.length > 0 ? totalInventoryValue / totalStockItems : 0;

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      setStockItems(stockItems.filter((item) => item.id !== itemToDelete));
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleEditClick = (item: StockItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormSubmit = (item: StockItem) => {
    if (editingItem) {
      // Update existing item
      setStockItems(
        stockItems.map((stockItem) =>
          stockItem.id === item.id ? item : stockItem
        )
      );
      setEditingItem(null);
    } else {
      // Add new item
      setStockItems([...stockItems, item]);
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
        <h1 className="text-3xl font-bold">Stock Management</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingItem ? "Edit Product" : "Add New Product"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StockForm
              onBack={handleBackFromForm}
              onSubmit={handleFormSubmit}
              editItem={editingItem}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className=" bg-blue-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Stock Items
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStockItems}</div>
                <p className="text-xs text-muted">
                  Across {stockItems.length} different products
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Inventory Value
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ৳{totalInventoryValue.toFixed(2)}
                </div>
                <p className="text-xs text-muted">
                  Based on current stock levels
                </p>
              </CardContent>
            </Card>

            {/* <Card className="bg-yellow-50 text-yellow-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${averagePrice.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Per item in inventory
                </p>
              </CardContent>
            </Card> */}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stock Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Export</Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted text-muted-foreground">
                    <TableRow>
                      <TableHead className="w-[80px]">Serial</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price Per Product</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedAndFilteredItems.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>৳{item.price.toFixed(2)}</TableCell>
                        <TableCell className="font-medium">
                          ৳{(item.quantity * item.price).toFixed(2)}
                        </TableCell>
                        <TableCell>{formatDate(item.date)}</TableCell>
                        <TableCell className="text-right">
                          <TooltipProvider>
                            <div className="flex justify-end gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleEditClick(item)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit product</p>
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDeleteClick(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete product</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                    {sortedAndFilteredItems.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
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
              Are you sure you want to delete this product? This action cannot
              be undone.
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
