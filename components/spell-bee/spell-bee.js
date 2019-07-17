/* eslint-disable no-nested-ternary, react/jsx-no-target-blank */

import React, { useState } from 'react';
import vocabulator from 'vocabulator';
import Svg from 'react-svg-inline';
import { combinedAll, randWords } from './words';
import css from './spell-bee.scss';
import bee from '../../assets/bee.svg';
import tick from '../../assets/tick.svg';
import cross from '../../assets/cross.svg';

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
          <Svg svg={bee} className={css.logo} />
          <select
            className={css.dropdown}
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
            Restart
          </button>
        </div>
        <div className={css.score}>
          <p className={css.txt}>{`Score: ${numCorrect} / ${wordList.length}`}</p>
          <p className={css.txt}>{`Attempt ${wordCount + 1} / ${wordList.length}`}</p>
        </div>
        <div className={css.content}>
          <button
            className={css.say}
            type="button"
            onClick={handleSay}
          >
            Say the word
          </button>

          <div className={css.answer}>
            <input
              className={css.typed}
              type="text"
              onChange={e => setCurrentWord(e.target.value)}
              value={currentWord}
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <div>
              {currentAnswerStatus === UNATTEMPTED ? '' : (currentAnswerStatus === CORRECT ? (
                <Svg svg={tick} className={css['btn-tick']} />
              ) : (
                <Svg svg={cross} className={css['btn-cross']} />
              ))}
            </div>
          </div>

          <p className={`${css.txt} ${css['correct-answer']}`}>{currentAnswerStatus === WRONG ? wordList[wordCount] : ''}</p>

          <div className={css['btn-check-next']}>
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
        <div className={css.credit}>
Icons made by
          <a href="https://www.freepik.com/?__hstc=57440181.c85c9071eae03f97b7b9063c4ba15d24.1563364323503.1563364323503.1563373434056.2&__hssc=57440181.4.1563373434056&__hsfp=1817208826" title="Freepik">Freepik</a>
          {' '}
from
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          {' '}
is licensed by
          <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div>
      </div>
    </div>
  );
};

export default SpellBee;
