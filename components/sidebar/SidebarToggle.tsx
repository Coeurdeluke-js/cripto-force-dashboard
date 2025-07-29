import React from "react";

type SidebarToggleProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function SidebarToggle({ collapsed, onToggle }: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      className="bg-[#232323] border border-[#232323] text-[#ec4d58] rounded-full w-6 h-6 flex items-center justify-center mt-1 transition-all duration-300 ease-in-out"
      style={{outline: 'none'}}
    >
      <svg
        className={`w-3.5 h-3.5 transition-all duration-500 ease-in-out ${collapsed ? 'rotate-0' : 'rotate-180'}`}
        fill="none"
        stroke="#ec4d58"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}