import React from 'react';
import Svg from 'react-svg-inline';
import css from './header.scss';
import brand from '../../assets/mathletics-logo.svg';

const Header = () => (
  <div
    className={css.header}
  >
    <Svg svg={brand} className={css.brand} />
    <h1 className={css.txt}>Sample PSR questions</h1>
  </div>
);

export default Header;
