import { USERS_ACQUIRED } from './login-actions';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case USERS_ACQUIRED: {
      return action.payload;
    }

    default:
}

  return state;
}
