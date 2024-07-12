import { GlobalStyle } from './styles/global';
import ComponentRoutes from './routes';
import { ThemeProvider } from 'styled-components';
import { colors } from './styles/colors';
import { fontSizes } from './styles/fontSize';
import { TavernaProvider } from './context';
import { AuthProvider } from './context/auth'

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
    <AuthProvider>
      <TavernaProvider>
        <ThemeProvider theme={theme}>
          <ComponentRoutes />
          <GlobalStyle />
        </ThemeProvider>
      </TavernaProvider>
    </AuthProvider>
  );
}

export default App;
