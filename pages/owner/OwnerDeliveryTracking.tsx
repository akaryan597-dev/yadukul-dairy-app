
import React, { useMemo, useState } from 'react';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData';
import { OrderStatus } from '../../types';

const statusColors = {
    [OrderStatus.PENDING]: 'bg-yellow-500',
    [OrderStatus.DELIVERED]: 'bg-green-500',
    [OrderStatus.CANCELLED]: 'bg-red-500',
};

const OwnerDeliveryTracking: React.FC = () => {
    const { orders, products, loading, updateOrderStatus } = useData();
    const [filter, setFilter] = useState<OrderStatus | 'All'>('All');

    const filteredOrders = useMemo(() => {
        if (filter === 'All') return orders;
        return orders.filter(o => o.status === filter);
    }, [orders, filter]);

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        await updateOrderStatus(orderId, newStatus);
    }

    return (
        <Card>
            <h1 className="text-3xl font-bold text-white mb-6">Delivery Tracking</h1>
            <div className="mb-4">
                <div className="flex space-x-2">
                    <button onClick={() => setFilter('All')} className={`px-4 py-2 rounded ${filter === 'All' ? 'bg-brand-blue' : 'bg-gray-700'}`}>All</button>
                    {Object.values(OrderStatus).map(status => (
                         <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded ${filter === status ? 'bg-brand-blue' : 'bg-gray-700'}`}>{status}</button>
                    ))}
                </div>
            </div>
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
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => {
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
                                         {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
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

export default OwnerDeliveryTracking;
