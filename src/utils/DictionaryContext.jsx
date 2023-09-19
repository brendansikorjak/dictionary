import { createContext, useContext, useState } from 'react';

// Create our theme context using createContext()
export const DictionaryContext = createContext();
const { Provider } = DictionaryContext;

// Create a custom hook that allows easy access to our NameContext values
export const useDictionary = () => useContext(DictionaryContext);

// Creating our theme provider. Accepts an argument of "props"
export default function DictionaryProvider(props) {
  const initialState = [
    { title: 'Basic French', tags: ['french'], _id: 4 },
    { title: 'General Biology', tags: ['biology'], _id: 3 },
    { title: 'General Chemistry', tags: ['chemistry'], _id: 1 },
    { title: 'General Geology', tags: ['geology'], _id: 0 },
    { title: 'Medical Terms', tags: ['medical'], _id: 2 },
  ];

  const [state, dispatch] = useState(initialState);

  return <Provider value={[state, dispatch]} {...props} />;
}
