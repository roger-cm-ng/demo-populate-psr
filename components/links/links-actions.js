/* global window */
/* eslint-disable no-console */

import axios from 'axios';
import getQueryString from 'querystring';

export const AUTH_TOKEN_ACQUIRED = 'AUTH_TOKEN_ACQUIRED';

const queryString = () => {
  const queryParams = window.location.search;
  const query = queryParams.replace('?', '');
  return getQueryString.parse(query);
};

export const acquireAuthToken = () => async (dispatch) => {
  const { username, password } = queryString();

  try {
    const response = await axios.post('https://identity-gateway.3plearning.com/AuthenticationGatewayV1/api/sessions', {
      username,
      password,
      productId: 0
    });

    if (response.data) {
      dispatch({
        type: AUTH_TOKEN_ACQUIRED,
        authToken: response.data.token
      });
    } else {
      console.log('error');
    }
  } catch (err) {
    console.log(err);
  }
};
