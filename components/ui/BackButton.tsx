'use client';

import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function BackButton({ href = '/dashboard/iniciado', className = '', children }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center text-gray-400 hover:text-white transition-colors ${className}`}
    >
      <Home className="mr-2" />
      {children || 'Volver'}
    </button>
  );
}