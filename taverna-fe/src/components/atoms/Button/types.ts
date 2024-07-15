export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  hierarchy?: 'primary' | 'secondary';
  fullwidth?: boolean;
}
