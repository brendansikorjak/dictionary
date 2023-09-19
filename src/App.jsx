import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router';
import './App.css';
import { theme } from './common/theme';
import Home from './Home';
import MultiChoice from './components/MultiChoice';
import DictionarySelect from './components/DictionarySelect';
import { useEffect, useState } from 'react';
import DictionaryProvider from './utils/DictionaryContext';

function App() {
  const [activeDictionary, setActiveDictionary] = useState(undefined);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DictionaryProvider>
        <DictionarySelect setActiveDictionary={setActiveDictionary} />
        <Routes>
          <Route
            path="/"
            element={<Home activeDictionary={activeDictionary} />}
          />
          <Route
            path="/multi"
            element={<MultiChoice activeDictionary={activeDictionary} />}
          />
        </Routes>
      </DictionaryProvider>
    </ThemeProvider>
  );
}

export default App;
