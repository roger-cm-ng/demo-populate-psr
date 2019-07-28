/* eslint-disable no-nested-ternary, react/jsx-no-target-blank */

import React, { useState } from 'react';
import vocabulator from 'vocabulator';
import Svg from 'react-svg-inline';
import { combinedAll, randWords, specificLevel } from './words';
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
  },
  {
    label: 'Level 1',
    value: 21
  },
  {
    label: 'Level 1 Special Category',
    value: 22
  },
  {
    label: 'Level 2',
    value: 23
  },
  {
    label: 'Level 2 Special Category',
    value: 24
  },
  {
    label: 'Level 3',
    value: 25
  },
  {
    label: 'Level 3 Special Category',
    value: 26
  },
  {
    label: 'Level 4',
    value: 27
  },
  {
    label: 'Level 4 Special Category',
    value: 28
  },
  {
    label: 'Level 5',
    value: 29
  },
  {
    label: 'Level 5 Special Category',
    value: 30
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
    } else if (Number(mode) === 21) {
      setWordList(specificLevel('lg1', 20));
    } else if (Number(mode) === 22) {
      setWordList(specificLevel('lsc1', 20));
    } else if (Number(mode) === 23) {
      setWordList(specificLevel('lg2', 20));
    } else if (Number(mode) === 24) {
      setWordList(specificLevel('lsc2', 20));
    } else if (Number(mode) === 25) {
      setWordList(specificLevel('lg3', 20));
    } else if (Number(mode) === 26) {
      setWordList(specificLevel('lsc3', 20));
    } else if (Number(mode) === 27) {
      setWordList(specificLevel('lg4', 20));
    } else if (Number(mode) === 28) {
      setWordList(specificLevel('lsc4', 20));
    } else if (Number(mode) === 29) {
      setWordList(specificLevel('lg5', 20));
    } else if (Number(mode) === 30) {
      setWordList(specificLevel('lsc5', 20));
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
