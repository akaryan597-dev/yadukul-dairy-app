import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Product, Order, StaffActivity, Conversion, MilkIntake, SupportTicket, Review } from '../types';
import api from '../services/api';

interface DataContextType {
  products: Product[];
  orders: Order[];
  staffActivities: StaffActivity[];
  conversions: Conversion[];
  milkIntake: MilkIntake[];
  supportTickets: SupportTicket[];
  reviews: Review[];
  loading: boolean;
  refreshData: () => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  addConversion: (conversion: Omit<Conversion, 'id'>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [staffActivities, setStaffActivities] = useState<StaffActivity[]>([]);
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [milkIntake, setMilkIntake] = useState<MilkIntake[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const [
        productsData, 
        ordersData, 
        activitiesData, 
        conversionsData, 
        intakeData, 
        ticketsData,
        reviewsData
      ] = await Promise.all([
        api.getProducts(),
        api.getOrders(),
        api.getStaffActivities(),
        api.getConversions(),
        api.getMilkIntake(),
        api.getSupportTickets(),
        api.getReviews(),
      ]);
      setProducts(productsData);
      setOrders(ordersData);
      setStaffActivities(activitiesData);
      setConversions(conversionsData);
      setMilkIntake(intakeData);
      setSupportTickets(ticketsData);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const updateProduct = async (product: Product) => {
    await api.updateProduct(product);
    await refreshData();
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    await api.addProduct(product);
    await refreshData();
  };

  const deleteProduct = async (productId: string) => {
    await api.deleteProduct(productId);
    await refreshData();
  }

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    await api.updateOrderStatus(orderId, status);
    await refreshData();
  }
  
  const addConversion = async (conversion: Omit<Conversion, 'id'>) => {
    await api.addConversion(conversion);
    await refreshData();
  }

  return (
    <DataContext.Provider value={{ 
        products, 
        orders, 
        staffActivities, 
        conversions,
        milkIntake,
        supportTickets,
        reviews,
        loading, 
        refreshData, 
        updateProduct,
        addProduct,
        deleteProduct,
        updateOrderStatus,
        addConversion,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};