import { SearchBar } from '@/shared/ui';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export function SearchInput({ value, onChange, className }: SearchInputProps) {
  return (
    <div className={className}>
      <SearchBar
        placeholder="Filter by name or description..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
