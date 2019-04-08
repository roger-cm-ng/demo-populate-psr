import { ESTIMATIONS_ACQUIRED } from './deck-actions';

export default function (state = {}, action) {
  switch (action.type) {
    case ESTIMATIONS_ACQUIRED:
      return action.payload;
    default:
}

  return state;
}
