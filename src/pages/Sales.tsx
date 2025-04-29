"use client";

import { useState } from "react";
import { Calendar, Download, Search, ShoppingCart } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";

// Mock data
const salesData = [
  {
    id: 1,
    orderNumber: "ORD-001",
    customer: "John Doe",
    date: "2023-04-15",
    amount: 599.99,
    status: "Completed",
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    customer: "Jane Smith",
    date: "2023-04-16",
    amount: 149.99,
    status: "Completed",
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    customer: "Bob Johnson",
    date: "2023-04-17",
    amount: 999.99,
    status: "Processing",
  },
  {
    id: 4,
    orderNumber: "ORD-004",
    customer: "Alice Brown",
    date: "2023-04-18",
    amount: 79.99,
    status: "Completed",
  },
  {
    id: 5,
    orderNumber: "ORD-005",
    customer: "Charlie Wilson",
    date: "2023-04-19",
    amount: 349.99,
    status: "Cancelled",
  },
];

export function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSales = salesData.filter(
    (sale) =>
      sale.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Sales Management</h1>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" />
          New Sale
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,179.95</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$435.99</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">60% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cancelled Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              20% cancellation rate
            </p>
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
                placeholder="Search orders..."
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
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">
                      {sale.orderNumber}
                    </TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>${sale.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          sale.status === "Completed"
                            ? "default"
                            : sale.status === "Processing"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {sale.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSales.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
