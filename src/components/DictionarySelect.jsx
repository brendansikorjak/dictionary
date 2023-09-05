import { Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { dictionariesUrl, randomWordUrl } from '../common/constant';

export default function DictionarySelect(props) {
  const [selectedDictionary, setSelectedDictionary] = useState(undefined);
  const [dictionaries, setDictionaries] = useState([]);

  useEffect(() => {
    fetch(dictionariesUrl)
      .then((data) => data.json())
      .then((data) => {
        setDictionaries(data);
        if (data.length > 0) {
          props.setActiveDictionary(data[0]);
          setSelectedDictionary(data[0]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      {dictionaries &&
        dictionaries.map((d, index) => (
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
