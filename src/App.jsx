import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router';
import './App.css';
import { theme } from './common/theme';
import Home from './Home';
import MultiChoice from './components/MultiChoice';
import DictionarySelect from './components/DictionarySelect';
import DictionaryProvider from './utils/DictionaryContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DictionaryProvider>
        <DictionarySelect />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/multi" element={<MultiChoice />} />
        </Routes>
      </DictionaryProvider>
    </ThemeProvider>
  );
}

export default App;
