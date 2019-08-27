import _ from 'lodash';
import {
  DEMO_AUTH_TOKEN_ACQUIRED,
  QA_AUTH_TOKEN_ACQUIRED,
  PROD_AUTH_TOKEN_ACQUIRED,
  CURRENT_FROM_ENV_SET,
  QA_ENV
} from './migrate-actions';

export const initialState = {
  authTokenDemo: null,
  authTokenQa: null,
  authTokenProd: null,
  currentFromEnv: QA_ENV,
  girlIds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEMO_AUTH_TOKEN_ACQUIRED: {
      return state;
    }

    case QA_AUTH_TOKEN_ACQUIRED: {
      return state;
    }

    case PROD_AUTH_TOKEN_ACQUIRED: {
      return state;
    }

    case CURRENT_FROM_ENV_SET: {
      const cloned = _.clone(state);
      cloned.currentFromEnv = action.env;
      return cloned;
    }

    default:
      return state;
  }
};
