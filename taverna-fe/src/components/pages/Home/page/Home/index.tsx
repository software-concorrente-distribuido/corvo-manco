import * as S from './styles';
import Header from '../../atoms/Header';
import Footer from '../../atoms/Footer';

export function Home() {
  return (
    <S.Home>
      <Header />
      {/* <S.MediaContainer
        playsInline={false}
        autoPlay={true}
        loop={true}
        muted={true}
        className="bgvid"
      >
        <source
          src="https://tavernna.com.br/video/intro.mp4"
          type="video/mp4"
        />
      </S.MediaContainer>
      <S.Content>
        <h1>Olá, seja bem-vindo à Taverna!</h1>
        <p>
          A Taverna é um lugar para você se divertir, relaxar e fazer novas
          amizades. Aqui você encontra jogos, bebidas e muita diversão!
        </p>
      </S.Content> */}
      <S.Main>
        <S.Content>Working on it...</S.Content>
      </S.Main>
      <Footer />
    </S.Home>
  );
}

export default Home;
