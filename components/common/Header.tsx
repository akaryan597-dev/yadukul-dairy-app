import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ChangePasswordModal from './ChangePasswordModal';
import { ICONS } from '../../constants';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const { user, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-300">Welcome, <span className="font-semibold text-brand-gold">{user?.name}</span> ({user?.role})</span>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        title="Change Password"
                        className="p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white transition duration-200"
                        dangerouslySetInnerHTML={{ __html: ICONS.PASSWORD }}
                    />
                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <ChangePasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Header;