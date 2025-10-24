
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData';
import { ProductType } from '../../types';

const OwnerDashboard: React.FC = () => {
    const { products, orders, loading } = useData();

    if (loading) return <div className="text-center p-8">Loading dashboard...</div>;

    const totalSales = orders.reduce((acc, order) => {
        const product = products.find(p => p.id === order.productId);
        return acc + (product ? product.price * order.quantity : 0);
    }, 0).toFixed(2);
    
    const salesByProductType = products.map(product => {
        const productOrders = orders.filter(o => o.productId === product.id);
        const totalQuantity = productOrders.reduce((sum, o) => sum + o.quantity, 0);
        return {
            name: product.name,
            sales: totalQuantity,
        };
    });

    const salesByDeliveryTypeData = [
        { name: 'Counter Sales', value: 400 }, // Mock data
        { name: 'Home Delivery', value: orders.length },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Owner Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-700">
                    <h4 className="text-lg font-medium text-blue-100">Total Sales</h4>
                    <p className="text-4xl font-bold text-white">₹{totalSales}</p>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-green-700">
                    <h4 className="text-lg font-medium text-green-100">Cow Milk Sales</h4>
                    <p className="text-4xl font-bold text-white">{orders.filter(o => products.find(p=>p.id === o.productId)?.type === ProductType.COW_MILK).length} Ltr</p>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-500 to-yellow-700">
                    <h4 className="text-lg font-medium text-yellow-100">Buffalo Milk Sales</h4>
                    <p className="text-4xl font-bold text-white">{orders.filter(o => products.find(p=>p.id === o.productId)?.type === ProductType.BUFFALO_MILK).length} Ltr</p>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500 to-purple-700">
                    <h4 className="text-lg font-medium text-purple-100">Total Orders</h4>
                    <p className="text-4xl font-bold text-white">{orders.length}</p>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Product Sales (Units)">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesByProductType}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                            <XAxis dataKey="name" stroke="#A0AEC0"/>
                            <YAxis stroke="#A0AEC0"/>
                            <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }} />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                 <Card title="Sales Distribution">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={salesByDeliveryTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {salesByDeliveryTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }} />
                             <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
};

export default OwnerDashboard;
