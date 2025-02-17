// card.tsx
import React from 'react';

interface CardProps {
  title: string;
  content: string;
  footer: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, content, footer, className }) => {
  return (
    <div className={`border rounded-md shadow-lg p-4 ${className}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-700 mt-2">{content}</p>
      <div className="mt-4 text-sm text-gray-500">{footer}</div>
    </div>
  );
};

export default Card;
