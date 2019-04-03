import { AUTHENTICATED } from './login-actions';

const initialState = {
  token: null,
  email: null,
  initial: null,
  color: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED: {
      return action.payload;
    }

    default:
}

  return state;
}
