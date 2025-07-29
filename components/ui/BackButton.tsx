'use client';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-gray-400 hover:text-[#ec4d58] flex items-center gap-1 text-sm transition-colors"
    >
      <i className="fas fa-arrow-left text-xs"></i>
      Volver
    </button>
  );
}