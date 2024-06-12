import taverna_footer from '../../../assets/taverna-footer.svg';

import * as S from './styles';

export function Footer() {
  return (
    <S.Footer>
      <img src={taverna_footer} alt="Logo da Taverna" />
      <div>
        <h1>Equipe Corvo Manco</h1>
        <p>Todos os direitos reservados</p>
      </div>
    </S.Footer>
  );
}

export default Footer;
