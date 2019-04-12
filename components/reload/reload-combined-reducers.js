import { combineReducers } from 'redux';
import bigCardReducer from '../big-card/big-card-reducer';
import identityReducer from '../login/identity-reducer';
import cardReducer from '../card/card-reducer';
import deckReducer from '../deck/deck-reducer';
import dropdownReducer from '../login/dropdown-reducer';
import headerReducer from '../header/header-reducer';

const ReloadCombinedReducers = combineReducers({
  bigCardReducer,
  identityReducer,
  cardReducer,
  deckReducer,
  dropdownReducer,
  headerReducer
});

export default ReloadCombinedReducers;
