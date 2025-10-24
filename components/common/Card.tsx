
import React, { ReactNode } from 'react';

interface CardProps {
    title?: string;
    children: ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`bg-gray-800 rounded-xl shadow-lg p-6 ${className}`}>
            {title && <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>}
            {children}
        </div>
    );
};

export default Card;
