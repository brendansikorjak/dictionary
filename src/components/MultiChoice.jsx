// import { multiChoiceUrl } from '../common/constant';
// import { useEffect, useState } from 'react';
// import { Button, Stack, Typography } from '@mui/material';

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

const MultipleChoice = (props) => {
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState(undefined);
  const [counter, setCounter] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(false);

  const mainGame = () => {
    pickAnswer();
    setActiveQuestion(true);
  };

  async function data() {
    try {
      const response = await fetch(
        `${multiChoiceUrl}?tag=${props.activeDictionary.tags[0]}`
      );
      const data = await response.json();
      setChoices(data);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  function pickAnswer() {
    let rand = Math.floor(Math.random() * 3);
    setAnswer(choices[rand]);
  }

  function regenQuestions(callback) {
    data();
    callback();
  }

  function checkAnswer(e) {
    const selected = e.target.getAttribute('id');
    console.log(selected);
    if (selected == answer._id) {
      !counter ? setCounter(1) : counterUP();
      e.target.setAttribute('style', 'background-color:green;');
      setTimeout(() => {
        e.target.setAttribute('style', 'background-color:none;');
        setChoices([]);
        data();
        setActiveQuestion(false);
      }, 1000);
    } else {
      e.target.setAttribute('style', 'background-color:red;');
      setTimeout(
        () => e.target.setAttribute('style', 'background-color:none;'),
        200
      );
    }
  }

  function counterUP() {
    const set = counter + 1;
    setCounter(set);
  }
  useEffect(() => {
    data();
    // pickAnswer()
  }, [props.activeDictionary]);

  return (
    <div>
      <Button
        variant="contained"
        sx={{ background: 'green' }}
        onClick={() => {
          // pickAnswer()
          mainGame();
        }}
      >
        NEW GAME{' '}
      </Button>

      {/* debug */}
      {/* <Button
        variant="contained"
        sx={{ background: 'green' }}
        onClick={() => {
          console.log(answer);
        }}
      >
        test{' '}
      </Button> */}
      {/* <Button variant="contained" sx={{ background: 'green' }} onClick={() => {
                regenQuestions()
            }} >GEN </Button> */}
      <Typography variant="h6" gutterBottom sx={{ margin: '15px' }}>
        {activeQuestion && answer && answer.word}
      </Typography>

      <div id="area">
        <Stack>
          {activeQuestion &&
            answer &&
            choices.map((choice, index) => {
              return (
                <Button
                  color={choice._id === answer._id ? 'primary' : 'success'}
                  sx={{ color: 'black' }}
                  key={choice._id}
                  onClick={(e) => checkAnswer(e)}
                  id={choice._id}
                >
                  {choice.definition}
                </Button>
              );
            })}
        </Stack>

        <div>Correct Answers : {counter}</div>
      </div>
    </div>
  );
};

export default MultipleChoice;
