
import React, { useState, useMemo } from 'react';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData';
import { Order, Product } from '../../types';

const OwnerInventory: React.FC = () => {
    const { orders, products, loading } = useData();
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

    const filteredOrders = useMemo(() => {
        return orders.filter(order => order.deliveryDate.startsWith(selectedMonth));
    }, [orders, selectedMonth]);

    const salesData = useMemo(() => {
        const data: { [productId: string]: { product: Product; quantity: number; revenue: number } } = {};
        filteredOrders.forEach(order => {
            const product = products.find(p => p.id === order.productId);
            if (product) {
                if (!data[product.id]) {
                    data[product.id] = { product, quantity: 0, revenue: 0 };
                }
                data[product.id].quantity += order.quantity;
                data[product.id].revenue += order.quantity * product.price;
            }
        });
        return Object.values(data);
    }, [filteredOrders, products]);
    
    const totalRevenue = salesData.reduce((acc, item) => acc + item.revenue, 0);
    const totalMilkSold = salesData.filter(item => item.product.unit === 'litre').reduce((acc, item) => acc + item.quantity, 0);
    const totalCurdProduced = salesData.filter(item => item.product.type === 'Curd').reduce((acc, item) => acc + item.quantity, 0);

    const exportToCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,Product Name,Quantity Sold,Unit,Revenue (INR)\n";
        salesData.forEach(item => {
            const row = [item.product.name, item.quantity, item.product.unit, item.revenue.toFixed(2)].join(',');
            csvContent += row + "\n";
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `inventory_report_${selectedMonth}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Inventory & Sales Report</h1>
                <div className="flex items-center space-x-4">
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={e => setSelectedMonth(e.target.value)}
                        className="bg-gray-700 p-2 rounded-lg"
                    />
                    <button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                 <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-gray-400">Total Revenue</h4>
                    <p className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-gray-400">Total Milk Sold</h4>
                    <p className="text-2xl font-bold">{totalMilkSold} Ltr</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-gray-400">Total Curd Sold</h4>
                    <p className="text-2xl font-bold">{totalCurdProduced} Kg</p>
                </div>
            </div>

            {loading ? <p>Loading data...</p> : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gray-700 text-left text-gray-300 uppercase text-sm">
                            <th className="p-4">Product</th>
                            <th className="p-4">Quantity Sold</th>
                            <th className="p-4">Unit</th>
                            <th className="p-4">Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.map(item => (
                            <tr key={item.product.id} className="border-b border-gray-700 hover:bg-gray-700">
                                <td className="p-4 font-medium">{item.product.name}</td>
                                <td className="p-4">{item.quantity}</td>
                                <td className="p-4">{item.product.unit}</td>
                                <td className="p-4">₹{item.revenue.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </Card>
    );
};

export default OwnerInventory;
