/* global window */
/* eslint-disable no-console */

import React, { useEffect } from 'react';
import axios from 'axios';
import getQueryString from 'querystring';

const queryString = () => {
  const queryParams = window.location.search;
  const query = queryParams.replace('?', '');
  return getQueryString.parse(query);
};

const Links = () => {
  const { username, password } = queryString();

  useEffect(() => {
    axios.post('https://identity-gateway.3plearning.com/AuthenticationGatewayV1/api/sessions', {
      username,
      password,
      productId: 0
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <h1>PSR Questions</h1>
  );
};

export default Links;
