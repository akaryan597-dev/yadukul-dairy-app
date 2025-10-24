
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData';
import { Product, SubscriptionFrequency, CustomerInfo, OrderStatus } from '../../types';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const CustomerBooking: React.FC = () => {
    const { products, loading } = useData();
    const { user } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [frequency, setFrequency] = useState<SubscriptionFrequency>(SubscriptionFrequency.ONCE);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        name: user?.name || '',
        street: '', city: 'Noida', pin: '',
        contactNumber: '', whatsappNumber: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct || !user) return;
        
        await api.createOrder({
            productId: selectedProduct.id,
            quantity,
            customerId: user.id,
            customerInfo,
            // FIX: Use the OrderStatus enum for type safety instead of a plain string.
            status: OrderStatus.PENDING,
            frequency,
            orderDate: new Date().toISOString(),
            deliveryDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        });
        
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            setSelectedProduct(null);
        }, 3000);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Our Products</h1>
            {loading ? <p>Loading products...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <Card key={product.id} className="flex flex-col">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold">{product.name}</h3>
                                <p className="text-gray-400">{product.type}</p>
                                <p className="text-2xl font-semibold text-brand-gold mt-2">₹{product.price.toFixed(2)} / {product.unit}</p>
                                <button onClick={() => setSelectedProduct(product)} className="mt-auto w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4 transition">
                                    Book Now
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
            {selectedProduct && (
                 <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg w-full max-w-2xl">
                       {!isSuccess ? (
                        <>
                         <h2 className="text-2xl font-bold mb-6">Book: {selectedProduct.name}</h2>
                         <form onSubmit={handleBooking} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400">Quantity ({selectedProduct.unit})</label>
                                    <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" className="w-full bg-gray-700 p-2 rounded mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400">Frequency</label>
                                    <select value={frequency} onChange={e => setFrequency(e.target.value as SubscriptionFrequency)} className="w-full bg-gray-700 p-2 rounded mt-1">
                                        {Object.values(SubscriptionFrequency).map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold border-t border-gray-700 pt-4 mt-4">Delivery Details</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="name" value={customerInfo.name} onChange={handleInfoChange} placeholder="Full Name" required className="bg-gray-700 p-2 rounded" />
                                <input type="text" name="contactNumber" value={customerInfo.contactNumber} onChange={handleInfoChange} placeholder="Contact Number" required className="bg-gray-700 p-2 rounded" />
                                <input type="text" name="street" value={customerInfo.street} onChange={handleInfoChange} placeholder="Street Address" required className="col-span-2 bg-gray-700 p-2 rounded" />
                                <input type="text" name="city" value={customerInfo.city} onChange={handleInfoChange} placeholder="City" required className="bg-gray-700 p-2 rounded" />
                                <input type="text" name="pin" value={customerInfo.pin} onChange={handleInfoChange} placeholder="PIN Code" required className="bg-gray-700 p-2 rounded" />
                             </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button type="button" onClick={() => setSelectedProduct(null)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
                                <button type="submit" className="bg-brand-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Confirm Booking</button>
                            </div>
                         </form>
                        </>
                       ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-green-400">Booking Confirmed!</h2>
                            <p className="mt-4">Your order for {quantity} {selectedProduct.unit} of {selectedProduct.name} has been placed.</p>
                            <p className="mt-2 text-gray-400">You will receive delivery notifications soon. Thanks for choosing Yadukul Dairy!</p>
                        </div>
                       )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerBooking;
