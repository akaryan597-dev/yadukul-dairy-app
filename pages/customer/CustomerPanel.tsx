import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { ICONS } from '../../constants';
import CustomerBooking from './CustomerBooking';
import CustomerOrderHistory from './CustomerOrderHistory';
import CustomerSupport from './CustomerSupport';
import CustomerAboutUs from './CustomerAboutUs';

const CustomerPanel: React.FC = () => {
    const [activeItem, setActiveItem] = useState('Book Products');

    const navItems = [
        { name: 'Book Products', icon: ICONS.BOOKING },
        { name: 'Order History', icon: ICONS.HISTORY },
        { name: 'About Us', icon: ICONS.ABOUT_US },
        { name: 'Support', icon: ICONS.SUPPORT },
    ];

    const renderContent = () => {
        switch (activeItem) {
            case 'Book Products':
                return <CustomerBooking />;
            case 'Order History':
                return <CustomerOrderHistory />;
            case 'About Us':
                return <CustomerAboutUs />;
            case 'Support':
                return <CustomerSupport />;
            default:
                return <CustomerBooking />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar navItems={navItems} activeItem={activeItem} setActiveItem={setActiveItem} />
            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-6 overflow-y-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default CustomerPanel;