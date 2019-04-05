import React from 'react';
import styleable from 'react-styleable';
import PropTypes from 'prop-types';
import css from './initial.scss';

const getInitial = (firstName, lastName) => {
  const firstChar = firstName[0].toUpperCase();
  const secondChar = lastName[0].toUpperCase();
  return `${firstChar}${secondChar}`;
};

const Initial = ({
  firstName, lastName, color, className
}) => (
  <div
    className={`${css.initial} override ${className}`}
    style={{ backgroundColor: `#${color}` }}
  >
    {getInitial(firstName, lastName)}
  </div>
);

Initial.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
};

export default styleable(css)(Initial);
