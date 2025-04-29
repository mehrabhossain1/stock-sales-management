import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, DollarSign, ShoppingCart } from "lucide-react";

export function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        {/* You can later add filters, date range picker, etc. here */}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-md hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-wide">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳45,231.89</div>
            {/* <p className="text-xs opacity-80 mt-1">
            +20.1% from last month
          </p> */}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-wide">
              Stock Items
            </CardTitle>
            <BarChart3 className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            {/* <p className="text-xs opacity-80 mt-1">
            +12 new items this week
          </p> */}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-wide">
              Total Sales
            </CardTitle>
            <ShoppingCart className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,350</div>
            {/* <p className="text-xs opacity-80 mt-1">
            +10.1% from last month
          </p> */}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-md hover:shadow-lg transition">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Recent Activity
          </CardTitle>
          <CardDescription>
            Overview of your recent stock and sales activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted transition"
              >
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Activity {i + 1}</p>
                  <p className="text-xs text-muted-foreground">
                    Description of activity {i + 1}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
