import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 acquireAuthToken, setCurrentFromEnv, DEMO_ENV, QA_ENV, PROD_ENV
} from './migrate-actions';
import UsernamePassword from '../username-password/username-password';

const Links = () => {
  const dispatch = useDispatch();
  const { migrateReducer } = useSelector(state => state);

  useEffect(() => {}, []);

  const envHandler = (evt) => {
    dispatch(setCurrentFromEnv(evt.target.value));
  };

  return (
    <Fragment>
      <UsernamePassword env={DEMO_ENV} />
      <select
        onChange={envHandler}
      >
        <option value={QA_ENV}>QA</option>
        <option value={PROD_ENV}>Prod</option>
      </select>
      <UsernamePassword env={migrateReducer.currentFromEnv} />
    </Fragment>
  );
};

export default Links;
