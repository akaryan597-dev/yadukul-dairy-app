
import React from 'react';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData';
import { OrderStatus } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const statusColors = {
    [OrderStatus.PENDING]: 'bg-yellow-500',
    [OrderStatus.DELIVERED]: 'bg-green-500',
    [OrderStatus.CANCELLED]: 'bg-red-500',
};

const StaffDeliveryManagement: React.FC = () => {
    const { orders, products, loading, updateOrderStatus } = useData();
    const { user } = useAuth();
    
    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        await updateOrderStatus(orderId, newStatus);
        // Log activity
        const order = orders.find(o => o.id === orderId);
        if(user && order) {
             const product = products.find(p => p.id === order.productId);
             const action = `Updated order ${order.id.slice(0, 8)} for ${product?.name} to ${newStatus}.`;
             await api.logStaffActivity(user.id, user.name, action);
        }
    };

    return (
        <Card>
            <h1 className="text-3xl font-bold text-white mb-6">Manage Deliveries</h1>
            {loading ? <p>Loading orders...</p> : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gray-700 text-left text-gray-300 uppercase text-sm">
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Product</th>
                            <th className="p-4">Delivery Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.filter(o => o.status === OrderStatus.PENDING).map(order => {
                            const product = products.find(p => p.id === order.productId);
                            return (
                                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700">
                                    <td className="p-4 text-xs font-mono">{order.id}</td>
                                    <td className="p-4">
                                        <div>{order.customerInfo.name}</div>
                                        <div className="text-xs text-gray-400">{order.customerInfo.street}, {order.customerInfo.city}</div>
                                    </td>
                                    <td className="p-4">{product?.name} ({order.quantity} {product?.unit})</td>
                                    <td className="p-4">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${statusColors[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <select 
                                         value={order.status} 
                                         onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                         className="bg-gray-700 p-2 rounded-md"
                                       >
                                         <option value={OrderStatus.PENDING}>{OrderStatus.PENDING}</option>
                                         <option value={OrderStatus.DELIVERED}>{OrderStatus.DELIVERED}</option>
                                       </select>
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

export default StaffDeliveryManagement;
