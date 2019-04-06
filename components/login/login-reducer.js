import _ from 'lodash';
import {
  TEXT_INPUTTED,
  FORMS_VALIDATED
} from './login-actions';

const initialState = {
  isValid: false,
  creds: {
    email: '',
    pin: ''
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEXT_INPUTTED: {
      const { key, val } = action.payload;
      const cloned = _.clone(state);
      cloned.creds[key] = val;
      return cloned;
    }

    case FORMS_VALIDATED: {
      const cloned = _.clone(state);
      cloned.isValid = action.payload;
      return cloned;
    }

    default:
}

  return state;
}
