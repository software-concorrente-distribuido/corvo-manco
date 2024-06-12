export interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: 'text' | 'password' | 'email' | 'number';
}
