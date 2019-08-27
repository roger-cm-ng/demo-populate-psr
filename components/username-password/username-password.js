import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import css from './username-password.scss';
import { setUsernamePassword } from './username-password-actions';

const UsernamePassword = ({ env }) => {
  const dispatch = useDispatch();
  const { usernamePasswordReducer } = useSelector(state => state);

  const inputHandler = (value, inputType) => {
    dispatch(setUsernamePassword({ env, value, inputType }));
  };

  return (
    <div className={css['username-password']}>
      <input
        className={css.text}
        type="text"
        placeholder="username"
        onChange={evt => inputHandler(evt.target.value, 'username')}
        value={usernamePasswordReducer[env].username}
      />
      <input
        className={css.password}
        type="password"
        placeholder="password"
        onChange={evt => inputHandler(evt.target.value, 'password')}
        value={usernamePasswordReducer[env].password}
      />
    </div>
  );
};

UsernamePassword.propTypes = {
  env: PropTypes.string
};

export default UsernamePassword;
