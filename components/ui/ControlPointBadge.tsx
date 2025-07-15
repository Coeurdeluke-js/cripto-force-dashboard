import React from 'react';
import { FaClipboardCheck } from 'react-icons/fa';

interface ControlPointBadgeProps {
  className?: string;
}

const ControlPointBadge: React.FC<ControlPointBadgeProps> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center ${className}`} title="Punto de Control">
      <FaClipboardCheck className="text-base text-yellow-400" />
    </div>
  );
};

export default ControlPointBadge; 