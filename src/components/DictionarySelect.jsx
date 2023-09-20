import { Chip, Stack } from '@mui/material';
import { useDictionary } from '../utils/DictionaryContext';

export default function DictionarySelect() {
  const { state, dispatch, active, setActive } = useDictionary();
  console.log('state', state);

  return (
    <Stack direction="column" spacing={2}>
      {state &&
        state.map((d, index) => (
          <Chip
            color={d._id === active._id ? 'primary' : 'secondary'}
            label={d.title}
            key={index}
            onClick={() => {
              setActive(d);
            }}
          />
        ))}
    </Stack>
  );
}
