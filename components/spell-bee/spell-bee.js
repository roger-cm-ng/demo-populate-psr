import React, { useState } from 'react';
import vocabulator from 'vocabulator';
import { combinedAll, randWords } from './words';
import css from './spell-bee.scss';

const synthesizer = vocabulator({
  language: 'en-AU',
  voiceName: 'Google AU English Female',
  pitch: 1
});

const modes = [
  {
    label: 'Random 10',
    value: 1,
    selected: true
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
    label: 'All 1000',
    value: 0
  }
];

const UNATTEMPTED = 'unattempted';
const CORRECT = 'correct';
const WRONG = 'wrong';

const SpellBee = () => {
  const [wordList, setWordList] = useState(randWords(1));
  const [modeNum, setModeNum] = useState(1);
  const [wordCount, setWordCount] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [numCorrect, setNumCorrect] = useState(0);
  const [currentAnswerStatus, setCurrentAnswerStatus] = useState(UNATTEMPTED);
  const [checkedDisable, setCheckDisable] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const init = (mode) => {
    if (Number(mode) === 0) {
      setWordList(combinedAll);
    } else {
      setWordList(randWords(mode));
    }
    setModeNum(mode);
    setWordCount(0);
    setCurrentWord('');
    setCurrentAnswerStatus(UNATTEMPTED);
    setIsComplete(false);
    setCheckDisable(false);
    setNumCorrect(0);
    setTimeline([]);
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
      setTimeline([...timeline, { word: wordList[wordCount], isCorrect: true }]);
    } else {
      setCurrentAnswerStatus(WRONG);
      setTimeline([...timeline, { word: wordList[wordCount], isCorrect: false }]);
    }
  };

  const handleNext = () => {
    setWordCount(wordCount + 1);
    setCurrentWord('');
    setCurrentAnswerStatus(UNATTEMPTED);
    setCheckDisable(false);
  };

  // useEffect(() => {
  //   console.log(timeline);
  // }, [timeline]);

  return (
    <div className={css['spell-bee']}>
      <div className={css.container}>
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
        {
          isComplete && (
            <ul className={css.timeline}>
              {
                timeline.map(i => (
                  <li key={i.word} className={i.isCorrect ? css['timeline-correct'] : css['timeline-wrong']}>{i.word}</li>
                ))
              }
            </ul>
          )
        }
      </div>
    </div>
  );
};

export default SpellBee;
