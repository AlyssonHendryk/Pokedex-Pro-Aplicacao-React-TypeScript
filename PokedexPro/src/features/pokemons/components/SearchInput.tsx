import "./SearchInput.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({
  value,
  onChange
}: SearchInputProps) {

  return (
    <input
      type="text"
      placeholder="Search by name or number..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}