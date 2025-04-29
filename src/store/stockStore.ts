/* eslint-disable @typescript-eslint/no-explicit-any */
// store/stockStore.ts
import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1"; // update if using env

export type StockItem = {
  _id?: string;
  name: string;
  quantity: number;
  price: number;
  date: string;
};

type StockStore = {
  stocks: StockItem[];
  loading: boolean;
  error: string | null;
  fetchStocks: (token: string) => Promise<void>;
  addStock: (stock: Omit<StockItem, "date">, token: string) => Promise<void>;
};

export const useStockStore = create<StockStore>((set) => ({
  stocks: [],
  loading: false,
  error: null,

  fetchStocks: async (token) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_BASE_URL}/stocks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ stocks: res.data.data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch stocks",
        loading: false,
      });
    }
  },

  addStock: async (stock, token) => {
    set({ loading: true, error: null });
    try {
      const newStock = {
        ...stock,
        date: new Date().toISOString(),
      };
      const res = await axios.post(`${API_BASE_URL}/stocks`, newStock, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        stocks: [...state.stocks, res.data.data],
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to add stock",
        loading: false,
      });
    }
  },
}));
