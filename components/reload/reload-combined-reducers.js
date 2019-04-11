import { combineReducers } from 'redux';
import bigCardReducer from '../big-card/big-card-reducer';
import identityReducer from '../login/identity-reducer';
import cardReducer from '../card/card-reducer';
import deckReducer from '../deck/deck-reducer';

const ReloadCombinedReducers = combineReducers({
  bigCardReducer,
  identityReducer,
  cardReducer,
  deckReducer
});

export default ReloadCombinedReducers;
