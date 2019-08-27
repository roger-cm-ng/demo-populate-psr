import _ from 'lodash';
import { USERNAME_PASSWORD_SET } from './username-password-actions';

export const initialState = {
  demo: {
    username: '',
    password: ''
  },
  qa: {
    username: '',
    password: ''
  },
  prod: {
    username: '',
    password: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERNAME_PASSWORD_SET: {
      const cloned = _.clone(state);
      cloned[action.payload.env][action.payload.inputType] = action.payload.value;
      return cloned;
    }

    default:
      return state;
  }
};
