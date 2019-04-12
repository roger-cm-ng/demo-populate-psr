import _ from 'lodash';
import { LOGIN_TOGGLED } from './header-actions';

const initialState = {
  login: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_TOGGLED: {
      const cloned = _.clone(state);
      cloned.login = action.vis;
      return cloned;
    }

    default:
}

  return state;
}
