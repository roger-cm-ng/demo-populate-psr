import _ from 'lodash';
import { AUTH_TOKEN_ACQUIRED } from './links-actions';

export const initialState = {
  authToken: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TOKEN_ACQUIRED: {
      const cloned = _.clone(state);
      cloned.authToken = action.authToken;
      return cloned;
    }

    default:
      return state;
  }
};
