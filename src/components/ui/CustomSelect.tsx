import React, { useState, useRef, useEffect } from 'react';

interface Option {
    value: string | number;
    label: string;
}

interface CustomSelectProps {
    value: string | number;
    options: Option[];
    onChange: (value: string | number) => void;
    className?: string;
    placeholder?: string;
    label?: string; // Optional suffix like '月' or '日'
    width?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    value,
    options,
    onChange,
    className = '',
    placeholder,
    label,
    width = 'w-full'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll to selected item when opening
    useEffect(() => {
        if (isOpen && listRef.current) {
            const selectedEl = listRef.current.querySelector('[data-selected="true"]');
            if (selectedEl) {
                selectedEl.scrollIntoView({ block: 'center' });
            }
        }
    }, [isOpen]);

    const selectedOption = options.find(o => o.value == value);

    return (
        <div 
            className={`relative ${width} ${className}`} 
            ref={containerRef}
        >
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between
                    bg-black/40 border border-white/20 
                    text-white text-sm rounded-lg h-9 px-3
                    hover:bg-white/10 hover:border-white/30 transition-all
                    focus:outline-none focus:border-blue-500
                    ${isOpen ? 'ring-2 ring-blue-500/50 border-blue-500' : ''}
                `}
            >
                <div className="flex items-center gap-1 truncate">
                    <span className="truncate">
                        {selectedOption ? selectedOption.label : placeholder || 'Select...'}
                    </span>
                    {label && <span className="text-gray-400 text-xs">{label}</span>}
                </div>
                
                <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute bottom-full left-0 w-full mb-1 z-50 min-w-[120px]">
                    <div className="bg-[#1a1f2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
                        <ul 
                            ref={listRef}
                            className="max-h-60 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent p-1"
                        >
                            {options.map((option) => (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        data-selected={option.value == value}
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`
                                            w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                                            flex items-center justify-between
                                            ${option.value == value 
                                                ? 'bg-blue-600 text-white font-medium' 
                                                : 'text-gray-300 hover:bg-white/10 hover:text-white'}
                                        `}
                                    >
                                        <span className="truncate">{option.label}</span>
                                        {option.value == value && (
                                            <i className="fas fa-check text-xs ml-2"></i>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
