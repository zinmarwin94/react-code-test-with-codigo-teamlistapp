import { combineReducers } from 'redux';
import Home from './home'; 

const rootReducer = combineReducers({
  team_list: Home
});

export default rootReducer;
