/* eslint-disable no-console */

import axios from 'axios';

export const DEMO_AUTH_TOKEN_ACQUIRED = 'DEMO_AUTH_TOKEN_ACQUIRED';
export const QA_AUTH_TOKEN_ACQUIRED = 'QA_AUTH_TOKEN_ACQUIRED';
export const PROD_AUTH_TOKEN_ACQUIRED = 'PROD_AUTH_TOKEN_ACQUIRED';
export const CURRENT_FROM_ENV_SET = 'CURRENT_FROM_ENV_SET';
export const DEMO_AUTH = 'https://identity-gateway.3plearning.com/AuthenticationGatewayV1/api/sessions';
export const QA_AUTH = 'https://gateway-qa.3plearning.com/AuthenticationGatewayV1/api/sessions';
export const PROD_AUTH = 'https://identity-gateway.3plearning.com/AuthenticationGatewayV1/api/sessions';
export const DEMO_ENV = 'demo';
export const QA_ENV = 'qa';
export const PROD_ENV = 'prod';

export const acquireAuthToken = (url, type) => async (dispatch) => {
  try {
    const response = await axios.post(url, {
      username,
      password,
      productId: 0
    });

    if (response.data) {
      dispatch({
        type,
        authToken: response.data.token
      });
    } else {
      console.log('error');
    }
  } catch (err) {
    console.log(err);
  }
};

export const setCurrentFromEnv = env => ({
  type: CURRENT_FROM_ENV_SET,
  env
});
