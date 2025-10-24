
import { User, Product, Order, OrderStatus, StaffActivity, Conversion, SupportTicket, Review } from '../types';

const API_URL = 'http://localhost:5000/api'; // Your backend URL

// Helper to get the auth token from local storage
const getAuthHeader = () => {
    const userString = localStorage.getItem('dairy_user');
    if (userString) {
        const user = JSON.parse(userString);
        if (user && user.token) {
            return {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            };
        }
    }
    return {
        'Content-Type': 'application/json',
    };
};

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        console.error('API Error:', error.message);
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
}

const api = {
    login: async (username: string, pass: string): Promise<(User & { token: string }) | null> => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password: pass }),
            });
            if (!response.ok) return null;
            return await response.json();
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    changePassword: async (userId: string, currentPass: string, newPass: string): Promise<{ success: boolean, message: string }> => {
        const response = await fetch(`${API_URL}/auth/change-password`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass }),
        });
        return handleResponse(response);
    },

    getStaff: async (): Promise<User[]> => {
        const response = await fetch(`${API_URL}/users/staff`, { headers: getAuthHeader() });
        return handleResponse(response);
    },

    registerStaff: async (name: string, username: string, password: string): Promise<User | null> => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify({ name, username, password, role: 'Staff' }),
        });
        return handleResponse(response);
    },

    getProducts: async (): Promise<Product[]> => {
        const response = await fetch(`${API_URL}/products`);
        return handleResponse(response);
    },
    addProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(productData)
        });
        return handleResponse(response);
    },
    updateProduct: async (updatedProduct: Product): Promise<Product> => {
        const response = await fetch(`${API_URL}/products/${updatedProduct.id}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify(updatedProduct)
        });
        return handleResponse(response);
    },
    deleteProduct: async (productId: string): Promise<void> => {
        await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
    },

    getOrders: async (): Promise<Order[]> => {
        const response = await fetch(`${API_URL}/orders`, { headers: getAuthHeader() });
        return handleResponse(response);
    },
    createOrder: async (orderData: Omit<Order, 'id'>): Promise<Order> => {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(orderData),
        });
        return handleResponse(response);
    },
    updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<Order> => {
       const response = await fetch(`${API_URL}/orders/${orderId}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify({ status }),
        });
        return handleResponse(response);
    },

    getStaffActivities: async (): Promise<StaffActivity[]> => {
        const response = await fetch(`${API_URL}/staff-activities`, { headers: getAuthHeader() });
        return handleResponse(response);
    },
    logStaffActivity: async (staffId: string, staffName: string, action: string): Promise<StaffActivity> => {
        const response = await fetch(`${API_URL}/staff-activities`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify({ staffId, staffName, action })
        });
        return handleResponse(response);
    },

    getConversions: async (): Promise<Conversion[]> => {
        const response = await fetch(`${API_URL}/conversions`, { headers: getAuthHeader() });
        return handleResponse(response);
    },
    addConversion: async (conversionData: Omit<Conversion, 'id'>): Promise<Conversion> => {
        const response = await fetch(`${API_URL}/conversions`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(conversionData)
        });
        return handleResponse(response);
    },
    
    getMilkIntake: async (): Promise<any[]> => {
        const response = await fetch(`${API_URL}/milk-intake`, { headers: getAuthHeader() });
        return handleResponse(response);
    },
    getSupportTickets: async (): Promise<SupportTicket[]> => {
        const response = await fetch(`${API_URL}/support-tickets`, { headers: getAuthHeader() });
        return handleResponse(response);
    },
    createSupportTicket: async (ticketData: Omit<SupportTicket, 'id' | 'date' | 'status'>): Promise<SupportTicket> => {
        const response = await fetch(`${API_URL}/support-tickets`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(ticketData)
        });
        return handleResponse(response);
    },

    getReviews: async (): Promise<Review[]> => {
        const response = await fetch(`${API_URL}/reviews`);
        return handleResponse(response);
    },
};

export default api;
