import taverna_header from '../../../../../assets/taverna.svg';
import { Link, useLocation } from 'react-router-dom';

import * as S from './styles';

export function Header() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <S.Header>
      <nav>
        <img height={40} src={taverna_header} alt="Logo da Taverna" />
        <ul>
          <S.CustomListItem checked={pathname === '/'}>
            <Link to="/">Home</Link>
          </S.CustomListItem>
          <S.CustomListItem checked={pathname === '/booking'}>
            <Link to="/booking">Reservas</Link>
          </S.CustomListItem>
        </ul>
      </nav>
    </S.Header>
  );
}

export default Header;
