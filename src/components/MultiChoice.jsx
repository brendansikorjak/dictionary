import { useEffect, useState } from 'react';
import { multiChoiceUrl } from '../common/constant';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  Chip,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useDictionary } from '../utils/DictionaryContext';

export default function MultiChoice() {
  const { active } = useDictionary();

  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [correctIndex, setCorrectIndex] = useState(-1);
  const [clicked, setClicked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const getWords = () => {
    fetch(`${multiChoiceUrl}?tag=${active.tags[0]}`)
      .then((data) => data.json())
      .then((data) => {
        setData(data);
        const key = Math.floor(Math.random() * 3);
        setCorrectIndex(key);
        setSelectedIndex(-1);
        setClicked(false);
      });
  };

  const definitionGame = (choice) => {
    setClicked(true);
    setSelectedIndex(choice);
    if (choice === correctIndex) {
      console.log('Winner');
    } else {
      console.log('Loser');
    }
  };

  return (
    <Grid
      container
      //spacing={4}
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      display="flex"
    >
      <Grid item xs={12}></Grid>
      <Grid
        container
        //spacing={4}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Button onClick={getWords} variant="contained">
            NEW GAME
          </Button>
          <Stack direction="column" spacing={1}>
            {data.map((d, index) => (
              <Chip
                label={d.word}
                key={index}
                onClick={() => definitionGame(index)}
              />
            ))}
          </Stack>

          {correctIndex > -1 && <Chip label={data[correctIndex].definition} />}
          {clicked && (
            <Typography>
              {selectedIndex === correctIndex ? 'You got it!' : 'Wrong!'}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
