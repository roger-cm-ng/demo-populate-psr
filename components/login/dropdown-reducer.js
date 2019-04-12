// import { DECKS_ACQUIRED } from './login-actions';

const initialState = [{ name: 'mediamoguls' }];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DECKS_ACQUIRED':
      return action.payload;

    default:
}

  return state;
};
