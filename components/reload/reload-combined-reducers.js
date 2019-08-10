import { combineReducers } from 'redux';
import linksReducer from '../links/links-reducer';

const ReloadCombinedReducers = combineReducers({
  linksReducer
});

export default ReloadCombinedReducers;
