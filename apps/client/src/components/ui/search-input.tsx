'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/providers/search';
import { cn } from '@/lib/utils';

type SearchInputProps = {
  placeholder?: string;
  className?: string;
  onSearch?: (term: string) => void;
};

export function SearchInput({
  placeholder = 'Search...',
  className = '',
  onSearch,
}: SearchInputProps) {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative rounded-md overflow-hidden ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        className="px-10 !border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        value={searchTerm}
        onChange={handleChange}
      />
      <X className={cn("absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer hidden", searchTerm && "block")} onClick={() => setSearchTerm('')} />
    </div>
  );
}
