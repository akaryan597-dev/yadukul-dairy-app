
import React, { useMemo } from 'react';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';
import { OrderStatus } from '../../types';

const statusColors = {
    [OrderStatus.PENDING]: 'bg-yellow-500',
    [OrderStatus.DELIVERED]: 'bg-green-500',
    [OrderStatus.CANCELLED]: 'bg-red-500',
};

const CustomerOrderHistory: React.FC = () => {
    const { orders, products, loading } = useData();
    const { user } = useAuth();

    const customerOrders = useMemo(() => {
        return orders.filter(o => o.customerId === user?.id).sort((a,b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    }, [orders, user]);

    return (
        <Card>
            <h1 className="text-3xl font-bold text-white mb-6">Your Order History</h1>
            {loading ? <p>Loading your orders...</p> : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gray-700 text-left text-gray-300 uppercase text-sm">
                            <th className="p-4">Order Date</th>
                            <th className="p-4">Product</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-4">Total Price</th>
                            <th className="p-4">Frequency</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerOrders.map(order => {
                            const product = products.find(p => p.id === order.productId);
                            if (!product) return null;
                            const totalPrice = product.price * order.quantity;
                            return (
                                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700">
                                    <td className="p-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td className="p-4">{product.name}</td>
                                    <td className="p-4">{order.quantity} {product.unit}</td>
                                    <td className="p-4">₹{totalPrice.toFixed(2)}</td>
                                    <td className="p-4">{order.frequency}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${statusColors[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            )}
        </Card>
    );
};

export default CustomerOrderHistory;
