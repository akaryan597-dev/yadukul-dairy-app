
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
    name: string;
    icon: string;
}

interface SidebarProps {
    navItems: NavItem[];
    activeItem: string;
    setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, activeItem, setActiveItem }) => {
    const { logout } = useAuth();
    return (
        <aside className="w-64 bg-gray-800 text-gray-200 flex flex-col">
            <div className="p-6 text-center border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">Yadukul Dairy</h2>
                <p className="text-sm text-brand-gold">Noida</p>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveItem(item.name);
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 ${
                            activeItem === item.name
                                ? 'bg-brand-blue text-white'
                                : 'hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                        <span className="font-medium">{item.name}</span>
                    </a>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition duration-200"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                   <span className="font-medium">Logout</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
