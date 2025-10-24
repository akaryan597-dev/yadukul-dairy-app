
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { ICONS } from '../../constants';
import OwnerDashboard from './OwnerDashboard';
import OwnerProducts from './OwnerProducts';
import OwnerInventory from './OwnerInventory';
import OwnerDeliveryTracking from './OwnerDeliveryTracking';
import OwnerConversion from './OwnerConversion';
import OwnerStaffManagement from './OwnerStaffManagement';

const OwnerPanel: React.FC = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const navItems = [
        { name: 'Dashboard', icon: ICONS.DASHBOARD },
        { name: 'Products', icon: ICONS.PRODUCTS },
        { name: 'Inventory', icon: ICONS.INVENTORY },
        { name: 'Delivery Tracking', icon: ICONS.DELIVERY },
        { name: 'Conversion', icon: ICONS.CONVERSION },
        { name: 'Staff Management', icon: ICONS.STAFF },
    ];

    const renderContent = () => {
        switch (activeItem) {
            case 'Dashboard':
                return <OwnerDashboard />;
            case 'Products':
                return <OwnerProducts />;
            case 'Inventory':
                return <OwnerInventory />;
            case 'Delivery Tracking':
                return <OwnerDeliveryTracking />;
            case 'Conversion':
                return <OwnerConversion />;
            case 'Staff Management':
                return <OwnerStaffManagement />;
            default:
                return <OwnerDashboard />;
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

export default OwnerPanel;
