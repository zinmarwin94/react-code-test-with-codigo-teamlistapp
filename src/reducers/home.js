
import { TEAM_LIST } from "../actions/actionTypes";  
 
const initialState = { 
  team_list: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEAM_LIST:
      console.log(action, "action")
      return {
        ...state,
        team_list: action.team_list.team_list
      };
    default:
      return state;
  }
};

export default reducer;
