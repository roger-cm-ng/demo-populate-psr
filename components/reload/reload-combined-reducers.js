import { combineReducers } from 'redux';
import migrateReducer from '../migrate/migrate-reducer';
import usernamePasswordReducer from '../username-password/username-password-reducer';

const ReloadCombinedReducers = combineReducers({
  migrateReducer,
  usernamePasswordReducer
});

export default ReloadCombinedReducers;
