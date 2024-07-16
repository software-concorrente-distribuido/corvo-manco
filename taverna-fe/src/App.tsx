import { GlobalStyle } from './styles/global';
import { ThemeProvider } from 'styled-components';
import { colors } from './styles/colors';
import { fontSizes } from './styles/fontSize';
import { TavernaProvider } from './context';
import { UserProvider } from './context/useAuth'
import Header from './components/atoms/Header';
import { Outlet } from 'react-router-dom';

export function App() {
  interface ThemeInterface {
    colors: Record<string, string>;
    fontSizes: Record<string, string>;
  }

  const theme: ThemeInterface = {
    colors,
    fontSizes,
  };

  return (
    <>
    <UserProvider>
      <TavernaProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <Outlet />
          <GlobalStyle />
        </ThemeProvider>
      </TavernaProvider>
    </UserProvider>
    </>
  );
}

export default App;
