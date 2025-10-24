
import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import api from '../../services/api';
import { User, Role } from '../../types';

const OwnerStaffManagement: React.FC = () => {
    const [staff, setStaff] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStaff, setNewStaff] = useState({ name: '', username: '', password: '' });

    const fetchStaff = async () => {
        setLoading(true);
        const staffList = await api.getStaff();
        setStaff(staffList);
        setLoading(false);
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStaff(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const createdUser = await api.registerStaff(newStaff.name, newStaff.username, newStaff.password);
        if (createdUser) {
            setStaff(prev => [...prev, createdUser]);
        }
        setIsModalOpen(false);
        setNewStaff({ name: '', username: '', password: '' });
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Staff Management</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-brand-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                    Create Staff Account
                </button>
            </div>
            {loading ? <p>Loading staff...</p> : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gray-700 text-left text-gray-300 uppercase text-sm">
                            <th className="p-4">Staff ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map(member => (
                            <tr key={member.id} className="border-b border-gray-700 hover:bg-gray-700">
                                <td className="p-4 font-mono text-xs">{member.id}</td>
                                <td className="p-4">{member.name}</td>
                                <td className="p-4">{member.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-6">Create New Staff Account</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" name="name" value={newStaff.name} onChange={handleInputChange} placeholder="Full Name" required className="w-full bg-gray-700 p-2 rounded" />
                            <input type="text" name="username" value={newStaff.username} onChange={handleInputChange} placeholder="Username" required className="w-full bg-gray-700 p-2 rounded" />
                            <input type="password" name="password" value={newStaff.password} onChange={handleInputChange} placeholder="Password" required className="w-full bg-gray-700 p-2 rounded" />
                            <div className="mt-6 flex justify-end space-x-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
                                <button type="submit" className="bg-brand-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default OwnerStaffManagement;
