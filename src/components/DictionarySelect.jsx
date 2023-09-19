import { Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { dictionariesUrl, randomWordUrl } from '../common/constant';
import { useDictionary } from '../utils/DictionaryContext';

export default function DictionarySelect(props) {
  const [state, dispatch] = useDictionary();
  const [selectedDictionary, setSelectedDictionary] = useState(state[0]);
  console.log('state', state);

  useEffect(() => {
    props.setActiveDictionary(state[0]);
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      {state &&
        state.map((d, index) => (
          <Chip
            color={d._id === selectedDictionary._id ? 'primary' : 'secondary'}
            label={d.title}
            key={index}
            onClick={() => {
              setSelectedDictionary(d);
              props.setActiveDictionary(d);
            }}
          />
        ))}
    </Stack>
  );
}
