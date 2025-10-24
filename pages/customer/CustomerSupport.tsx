import React, { useState } from 'react';
import Card from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const CustomerSupport: React.FC = () => {
    const { user } = useAuth();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        await api.createSupportTicket({
            customerId: user.id,
            customerName: user.name,
            subject,
            message
        });

        setIsSuccess(true);
        setSubject('');
        setMessage('');
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <h1 className="text-3xl font-bold text-white mb-2">Contact Support</h1>
                <p className="text-gray-400 mb-6">Have an issue or a question? Fill out the form below and we'll get back to you shortly.</p>
                
                <div className="bg-gray-700 p-4 rounded-lg mb-6 text-center">
                    <p className="font-semibold">For immediate assistance or to place an order via phone:</p>
                    <p className="text-lg text-brand-gold font-bold">Call Us: +91 8439988051</p>
                    <p className="mt-2 font-semibold">For complaints or feedback:</p>
                    <p className="text-lg text-brand-gold font-bold">Complaints: +91 9654314000</p>
                </div>

                {isSuccess && (
                    <div className="bg-green-500 text-white p-4 rounded-lg mb-6">
                        Your support ticket has been submitted successfully! Our team will review it and respond as soon as possible.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                        <textarea
                            id="message"
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-brand-blue"
                        >
                            Submit Ticket
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CustomerSupport;