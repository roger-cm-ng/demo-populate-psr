import _ from 'lodash';
import { TEXT_INPUTTED } from './login-actions';

const initialState = {
  fullName: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEXT_INPUTTED: {
      const { key, val } = action.payload;
      const cloned = _.clone(state);
      cloned[key] = val;
      return cloned;
    }

    default:
}

  return state;
}
