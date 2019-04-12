import _ from 'lodash';
import randomColor from 'randomcolor';
import { TEXT_INPUTTED, LOCAL_STORAGE_DATA_ACQUIRED } from './login-actions';

const initialState = {
  initial: '',
  color: randomColor({ luminosity: 'dark' }),
  deck: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEXT_INPUTTED: {
      const { key, val } = action.payload;
      const cloned = _.clone(state);
      cloned[key] = val;
      return cloned;
    }

    case LOCAL_STORAGE_DATA_ACQUIRED: {
      return action.payload;
    }

    default:
}

  return state;
}
