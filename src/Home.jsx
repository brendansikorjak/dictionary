import { useEffect, useState } from 'react';
import {
  Chip,
  Stack,
  Grid,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { dictionariesUrl, randomWordUrl } from './common/constant';
import TopDrawer from './components/TopDrawer';
import DictionarySelect from './components/DictionarySelect';

const Home = (props) => {
  const [activeDictionary, setActiveDictionary] = useState(undefined);
  const [wordAndDefinition, setWordAndDefinition] = useState(undefined);

  const getRandomWord = () => {
    fetch(`${randomWordUrl}?tag=${props.activeDictionary.tags[0]}`)
      .then((data) => data.json())
      .then((data) => setWordAndDefinition(data))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <TopDrawer />
      <Grid container spacing={4} direction="row">
        <Grid item>
          {/* <DictionarySelect setActiveDictionary={setActiveDictionary} /> */}
        </Grid>

        <Grid item sm={4}>
          <Grid container direction="column" spacing={4}>
            <Grid item sm={4}>
              <Button onClick={getRandomWord} variant="contained">
                Get Random Word
              </Button>
            </Grid>
            <Grid item sm={4}>
              {wordAndDefinition && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{wordAndDefinition.word}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{wordAndDefinition.definition}</Typography>
                  </AccordionDetails>
                </Accordion>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
