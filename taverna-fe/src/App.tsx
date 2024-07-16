import { GlobalStyle } from './styles/global';
import ComponentRoutes from './routes';
import { ThemeProvider } from 'styled-components';
import { colors } from './styles/colors';
import { fontSizes } from './styles/fontSize';
import { TavernaProvider } from './context';
import { UserProvider } from './context/useAuth'

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
    <UserProvider>
      <TavernaProvider>
        <ThemeProvider theme={theme}>
          <ComponentRoutes />
          <GlobalStyle />
        </ThemeProvider>
      </TavernaProvider>
    </UserProvider>
  );
}

export default App;
