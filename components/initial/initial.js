import React from 'react';
import styleable from 'react-styleable';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import css from './initial.scss';

const getInitial = (fullName) => {
  console.log(/\w+([ ]+\w+){1,2}/.test(fullName));
  if (!/\w+([ ]+\w+){1,2}/.test(fullName)) {
    return '';
  }

  const fullNameArr = fullName.split(' ');
  return `${fullNameArr[0].toUpperCase()}${fullNameArr[1].toUpperCase()}`;
};

const Initial = ({
  fullName, className
}) => (
  <div
    className={`${css.initial} override ${className}`}
    style={{ backgroundColor: `${randomColor({ luminosity: 'dark' })}` }}
  >
    {getInitial(fullName)}
  </div>
);

Initial.propTypes = {
  fullName: PropTypes.string,
  className: PropTypes.string
};

export default styleable(css)(Initial);
