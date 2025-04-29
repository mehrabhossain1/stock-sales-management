import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, BarChart, PieChart } from "lucide-react";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-violet-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <LineChart className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳45,231.89</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card className="bg-blue-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Items</CardTitle>
            <PieChart className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            {/* <p className="text-xs text-muted">
              +12 new items this week
            </p> */}
          </CardContent>
        </Card>

        <Card className="bg-green-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <BarChart className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2350</div>
            {/* <p className="text-xs text-muted-foreground">
              +10.1% from last month
            </p> */}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Overview of your recent stock and sales activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg border p-3"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Activity {i + 1}</p>
                  <p className="text-xs text-muted-foreground">
                    Description of activity {i + 1}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
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
