// components/SearchBar.tsx
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string; 
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Pesquisar",
  className = "" 
}: SearchBarProps) {
  return (
    <div className={`relative w-72 ${className}`}>
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none w-full transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}