"use client";

import {
  BarChart3,
  DollarSign,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

// import { StockForm, type StockItem } from "@/components/forms/NewStockForm";
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
import { useStockStore } from "@/store/stockStore";

// Updated mock data with dates
// const initialStockItems: StockItem[] = [
//   {
//     id: 1,
//     name: "Product A",
//     quantity: 150,
//     price: 299.99,
//     date: "2023-04-15T10:30:00",
//   },
//   {
//     id: 2,
//     name: "Product B",
//     quantity: 75,
//     price: 499.99,
//     date: "2023-04-18T14:45:00",
//   },
//   {
//     id: 3,
//     name: "Product C",
//     quantity: 200,
//     price: 49.99,
//     date: "2023-04-20T09:15:00",
//   },
//   {
//     id: 4,
//     name: "Product D",
//     quantity: 5,
//     price: 999.99,
//     date: "2023-04-22T16:30:00",
//   },
//   {
//     id: 5,
//     name: "Product E",
//     quantity: 0,
//     price: 9.99,
//     date: "2023-04-25T11:20:00",
//   },
// ];

export function StockPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  // const [stockItems, setStockItems] = useState<StockItem[]>(initialStockItems);
  // const [editingItem, setEditingItem] = useState<StockItem | null>(null);

  const { stocks, fetchStocks, loading, error } = useStockStore();
  console.log(stocks);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InpoYW5pa0BnbWFpbC5jb20iLCJpYXQiOjE3NDU5MTc4MjYsImV4cCI6MTc0NjAwNDIyNn0.Gnu73tNY2astZWIGTqYhSu0Ex8XOSq2gNG6N1mBtLOw"; // 🔐 Replace with actual token
    fetchStocks(token);
  }, [fetchStocks]);

  if (loading) return <p>Loading stocks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Sort items by date (newest first) and filter by search term
  const sortedAndFilteredItems = [...stocks]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Calculate total stock items (sum of all quantities)
  const totalStockItems = stocks.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total value of inventory (sum of quantity * price for each item)
  const totalInventoryValue = stocks.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Calculate average price per item
  // const averagePrice =
  //   stockItems.length > 0 ? totalInventoryValue / totalStockItems : 0;

  // const handleDeleteClick = (id: number) => {
  //   setItemToDelete(id);
  //   setDeleteDialogOpen(true);
  // };

  // TODO: Implement delete functionality
  // const confirmDelete = () => {
  //   if (itemToDelete !== null) {
  //     setStockItems(stockItems.filter((item) => item.id !== itemToDelete));
  //   }
  //   setDeleteDialogOpen(false);
  //   setItemToDelete(null);
  // };

  // const handleEditClick = (item: StockItem) => {
  //   setEditingItem(item);
  //   setShowForm(true);
  // };

  // const handleFormSubmit = (item: StockItem) => {
  //   if (editingItem) {
  //     // Update existing item
  //     setStockItems(
  //       stockItems.map((stockItem) =>
  //         stockItem.id === item.id ? item : stockItem
  //       )
  //     );
  //     setEditingItem(null);
  //   } else {
  //     // Add new item
  //     setStockItems([...stockItems, item]);
  //   }
  // };

  // const handleBackFromForm = () => {
  //   setShowForm(false);
  //   setEditingItem(null);
  // };

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Stock Management</h1>
        <Button onClick={() => setShowForm(true)} className="transition ">
          <Plus className="mr-2 h-4 w-4" />
          Add New Products
        </Button>
      </div>

      {showForm ? (
        <Card className="shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>
              {/* {editingItem ? "Edit Product" : "Add New Product"} */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <StockForm
              onBack={handleBackFromForm}
              onSubmit={handleFormSubmit}
              editItem={editingItem}
            /> */}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Stock Items
                </CardTitle>
                <BarChart3 className="h-5 w-5 opacity-80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalStockItems}</div>
                <p className="text-xs text-white/70">
                  Across {stocks.length} products
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Inventory Value
                </CardTitle>
                <DollarSign className="h-5 w-5 opacity-80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ৳{totalInventoryValue.toFixed(2)}
                </div>
                <p className="text-xs text-white/70">Based on current stock</p>
              </CardContent>
            </Card>
          </div>

          {/* Stock Overview */}
          <Card className="shadow-md hover:shadow-lg transition">
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
                {/* <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="transition hover:bg-muted"
                  >
                    Export
                  </Button>
                </div> */}
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/60">
                    <TableRow>
                      <TableHead className="w-[80px]">#</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedAndFilteredItems.map((item, index) => (
                      <TableRow
                        key={item._id}
                        className="hover:bg-muted/40 even:bg-muted/10 transition"
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>৳{item.price.toFixed(2)}</TableCell>
                        <TableCell className="font-bold">
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
                                    className="h-8 w-8 transition hover:bg-primary/10"
                                    // onClick={() => handleEditClick(item)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit Product</TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:bg-destructive/10 transition"
                                    // onClick={() => handleDeleteClick(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Delete Product</TooltipContent>
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
            {/* <Button variant="destructive" onClick={confirmDelete}> */}
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
