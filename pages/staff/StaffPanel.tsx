
import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { ICONS } from '../../constants';
import StaffDeliveryManagement from './StaffDeliveryManagement';
import StaffActivityLog from './StaffActivityLog';

const StaffPanel: React.FC = () => {
    const [activeItem, setActiveItem] = useState('Delivery Management');

    const navItems = [
        { name: 'Delivery Management', icon: ICONS.DELIVERY },
        { name: 'Activity Log', icon: ICONS.HISTORY },
    ];

    const renderContent = () => {
        switch (activeItem) {
            case 'Delivery Management':
                return <StaffDeliveryManagement />;
            case 'Activity Log':
                return <StaffActivityLog />;
            default:
                return <StaffDeliveryManagement />;
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

export default StaffPanel;
