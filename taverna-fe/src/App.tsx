import { GlobalStyle } from './styles/global';
import ComponentRoutes from './routes';
import { ThemeProvider } from 'styled-components';
import { colors } from './styles/colors';
import { fontSizes } from './styles/fontSize';
import { BossYaProvider } from './context';

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
    <BossYaProvider>
      <ThemeProvider theme={theme}>
        <ComponentRoutes />
        <GlobalStyle />
      </ThemeProvider>
    </BossYaProvider>
  );
}

export default App;
