import { ThemeProvider } from '@features/material';
import { BrowserRouter } from 'react-router-dom';
import { Main } from './pages';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
