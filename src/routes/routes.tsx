import { RootLayout } from "@/components/layout/RootLayout";
import { DashboardPage } from "@/pages/Dashboard";
import { SalesPage } from "@/pages/Sales";
import { StockPage } from "@/pages/Stock";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "stock",
        element: <StockPage />,
      },
      {
        path: "sales",
        element: <SalesPage />,
      },
    ],
  },
]);
