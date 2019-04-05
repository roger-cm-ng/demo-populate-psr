import { AUTHENTICATED } from '../login/login-actions';

const initialState = {
  token: null,
  email: null,
  firstName: null,
  lastName: null,
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
