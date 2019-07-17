import React, { useEffect, useState } from 'react';
import vocabulator from 'vocabulator';
import { last, randWords } from './words';
import css from './spell-bee.scss';

const synthesizer = vocabulator({
  language: 'en-AU',
  voiceName: 'Google AU English Female',
  pitch: 1
});

const modes = [
  {
    label: 'Random 10',
    value: 1
  },
  {
    label: 'Random 20',
    value: 2
  },
  {
    label: 'Random 50',
    value: 5
  },
  {
    label: 'Random 80',
    value: 8
  },
  {
    label: 'Random 100',
    value: 10
  },
  {
    label: 'Last',
    value: 0,
    selected: true
  }
];

const UNATTEMPTED = 'unattempted';
const CORRECT = 'correct';
const WRONG = 'wrong';

const SpellBee = () => {
  const [wordList, setWordList] = useState(last);
  const [modeNum, setModeNum] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [numCorrect, setNumCorrect] = useState(0);
  const [currentAnswerStatus, setCurrentAnswerStatus] = useState(UNATTEMPTED);
  const [checkedDisable, setCheckDisable] = useState(false);
  // const [attemptedWords, setAttemptedWords] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const init = (mode) => {
    if (Number(mode) === 0) {
      setWordList(last);
    } else {
      setWordList(randWords(mode));
    }
    setModeNum(mode);
    setWordCount(0);
    setCurrentWord('');
    setCurrentAnswerStatus(UNATTEMPTED);
    setIsComplete(false);
  };

  const handleSay = () => {
    synthesizer.say({ text: wordList[wordCount] });
  };

  const handleCheck = () => {
    if (wordCount === wordList.length - 1) {
      setIsComplete(true);
    }
    setCheckDisable(true);
    if (currentWord === wordList[wordCount]) {
      setNumCorrect(numCorrect + 1);
      setCurrentAnswerStatus(CORRECT);
    } else {
      setCurrentAnswerStatus(WRONG);
    }
  };

  const handleNext = () => {
    setWordCount(wordCount + 1);
    setCurrentWord('');
    setCurrentAnswerStatus(UNATTEMPTED);
    setCheckDisable(false);
  };

  useEffect(() => {
    // console.log(wordList);
  }, [wordList]);

  return (
    <div className={css['spell-bee']}>
      <div className={css.header}>
        <select
          onChange={e => init(e.target.value)}
        >
          {
            modes.map(mode => (
              <option
                defaultValue={mode.defaultValue ? mode.value : false}
                value={mode.value}
                key={mode.label}
              >
                {mode.label}
              </option>
            ))
          }
        </select>
        <button
          type="button"
          onClick={() => init(modeNum)}
          disabled={!isComplete}
        >
          Start again
        </button>
      </div>
      <div className={css.content}>
        <p>{`Score: ${numCorrect} / ${wordList.length} | Attempt ${wordCount + 1} / ${wordList.length}`}</p>
        <button
          type="button"
          onClick={handleSay}
          disabled={checkedDisable}
        >
          Say the word
        </button>

        <div className={css.answer}>
          <input
            type="text"
            onChange={e => setCurrentWord(e.target.value)}
            value={currentWord}
          />
          <p>{currentAnswerStatus === UNATTEMPTED ? '' : currentAnswerStatus}</p>
        </div>

        <p>{currentAnswerStatus === WRONG ? wordList[wordCount] : ''}</p>

        <button
          type="button"
          onClick={handleCheck}
          disabled={checkedDisable}
        >
          Check
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!checkedDisable || isComplete}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SpellBee;
