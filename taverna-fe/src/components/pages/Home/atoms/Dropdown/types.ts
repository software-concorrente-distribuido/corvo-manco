export interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  label: string;
}
