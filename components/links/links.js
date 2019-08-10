import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { acquireAuthToken } from './links-actions';
import List from '../list/list';
import Header from '../header/header';

const Links = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(acquireAuthToken());
  }, []);

  return (
    <Fragment>
      <Header />
      <List />
    </Fragment>
  );
};

export default Links;
