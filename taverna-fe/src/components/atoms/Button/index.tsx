import * as S from './styles';
import { ButtonProps } from './types';

export function Button({
  onClick,
  children,
  hierarchy = 'primary',
  fullwidth,
}: ButtonProps) {
  return (
    <S.Button onClick={onClick} hierarchy={hierarchy} fullwidth={fullwidth}>
      {children}
    </S.Button>
  );
}

export default Button;
