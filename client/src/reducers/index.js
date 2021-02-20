  import { combineReducers } from 'redux';

import tierlist from './tierlist';
import authReducer from './auth';

export const reducers = combineReducers({ tierlist, authReducer });