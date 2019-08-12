/* global window */
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import css from './list.scss';
import questions from './questions';

const List = () => {
  const linksReducer = useSelector(state => state.linksReducer);

  const questionHandler = (girlId) => {
    window.location.assign(`https://mle.mathletics.com/?isPreview=true&authToken=${linksReducer.authToken}&girlId=${girlId}`);
  };

  return (
    <div
      className={css.list}
    >
      <div
        className={css.bkgd}
      >
        {
          questions().map(question => (
            <button
              disabled={!linksReducer.authToken}
              onClick={() => questionHandler(question.girlId)}
              type="button"
              className={css.btn}
              key={question.girlId}
            >
              {
                linksReducer.authToken ? (
                  <div className={css['btn-txt']}>{question.label}</div>
                ) : (
                  <Fragment>
                    <span className={css['btn-load']}>Loading</span>
                    <span className={css.dots}>.</span>
                  </Fragment>
                )
              }
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default List;
