import React from 'react';
import styleable from 'react-styleable';
import PropTypes from 'prop-types';
import css from './initial.scss';

const Initial = ({
  initial,
  className,
  color
}) => (
  <div
    className={`${css.initial} override ${className}`}
    style={{ backgroundColor: `${color}` }}
  >
    {initial.toUpperCase()}
  </div>
);

Initial.propTypes = {
  initial: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
};

export default styleable(css)(Initial);
