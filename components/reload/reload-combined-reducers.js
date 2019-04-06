import { combineReducers } from 'redux';
import bigCardReducer from '../big-card/big-card-reducer';
import loginReducer from '../login/login-reducer';
import identityReducer from '../login/identity-reducer';
import usersReducer from '../login/users-reducer';
import cardReducer from '../card/card-reducer';
import deckReducer from '../deck/deck-reducer';

const ReloadCombinedReducers = combineReducers({
  bigCardReducer,
  loginReducer,
  identityReducer,
  cardReducer,
  deckReducer,
  usersReducer
});

export default ReloadCombinedReducers;
