
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData';
import { Conversion } from '../../types';

const OwnerConversion: React.FC = () => {
    const { conversions, milkIntake, addConversion } = useData();
    const [newConversion, setNewConversion] = useState<Omit<Conversion, 'id'>>({
        date: new Date().toISOString().slice(0, 10),
        milkUsedLiters: 0,
        curdProducedKg: 0,
        paneerProducedKg: 0,
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewConversion(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addConversion(newConversion);
        setNewConversion({
            date: new Date().toISOString().slice(0, 10),
            milkUsedLiters: 0,
            curdProducedKg: 0,
            paneerProducedKg: 0,
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <Card title="Add New Conversion">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400">Date</label>
                            <input type="date" name="date" value={newConversion.date} onChange={handleInputChange} className="w-full bg-gray-700 p-2 rounded mt-1" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400">Milk Used (Liters)</label>
                            <input type="number" name="milkUsedLiters" value={newConversion.milkUsedLiters} onChange={handleInputChange} className="w-full bg-gray-700 p-2 rounded mt-1" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400">Curd Produced (Kg)</label>
                            <input type="number" name="curdProducedKg" value={newConversion.curdProducedKg} onChange={handleInputChange} className="w-full bg-gray-700 p-2 rounded mt-1" required />
                        </div>
                         <div>
                            <label className="block text-sm text-gray-400">Paneer Produced (Kg)</label>
                            <input type="number" name="paneerProducedKg" value={newConversion.paneerProducedKg} onChange={handleInputChange} className="w-full bg-gray-700 p-2 rounded mt-1" required />
                        </div>
                        <button type="submit" className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                            Record Conversion
                        </button>
                    </form>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card title="Daily Conversion History">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800 rounded-lg">
                            <thead>
                                <tr className="bg-gray-700 text-left text-gray-300 uppercase text-sm">
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Milk Used (Ltr)</th>
                                    <th className="p-4">Curd (Kg)</th>
                                    <th className="p-4">Paneer (Kg)</th>
                                    <th className="p-4">Conversion %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {conversions.map(conv => {
                                    const totalProduced = conv.curdProducedKg + conv.paneerProducedKg;
                                    const percentage = conv.milkUsedLiters > 0 ? ((totalProduced / conv.milkUsedLiters) * 100).toFixed(1) : 0;
                                    return (
                                        <tr key={conv.id} className="border-b border-gray-700 hover:bg-gray-700">
                                            <td className="p-4">{new Date(conv.date).toLocaleDateString()}</td>
                                            <td className="p-4">{conv.milkUsedLiters}</td>
                                            <td className="p-4">{conv.curdProducedKg}</td>
                                            <td className="p-4">{conv.paneerProducedKg}</td>
                                            <td className="p-4">{percentage}%</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OwnerConversion;
