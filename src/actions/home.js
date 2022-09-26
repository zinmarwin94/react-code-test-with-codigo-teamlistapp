
import { TEAM_LIST } from "./actionTypes";

export async function setSpaceList (team_list) { 
  return {
    type: TEAM_LIST,
    team_list
  };
};