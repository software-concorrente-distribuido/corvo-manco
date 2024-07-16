import * as S from './styles';
import Header from '../../atoms/Header';
import Footer from '../../atoms/Footer';
import LoginForm from '../../molecules/LoginForm';
import { useState } from 'react';
import RegisterForm from '../../molecules/RegisterForm';

export function Home() {
  const [formType, setFormType] = useState('login');

  return (
    <S.Home>
      <S.Main>
        <S.Content>
          {formType === 'login' && (
            <LoginForm openRegisterForm={() => setFormType('register')} />
          )}
          {formType === 'register' && (
            <RegisterForm openLoginForm={() => setFormType('login')} />
          )}
        </S.Content>
        <S.VideoContainer>
          <S.VideoOverlay />
          <video autoPlay muted loop>
            <source
              src="https://tavernna.com.br/video/intro.mp4"
              type="video/mp4"
            />
          </video>
        </S.VideoContainer>
      </S.Main>
      <Footer />
    </S.Home>
  );
}

export default Home;
