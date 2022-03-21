import { LOADING } from "./actionTypes";
import { LOGIN } from "./actionTypes";

const initialState = {
  loading: false,
  login: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.data };
    case LOGIN:
      return { ...state, login: action.data };
    default:
      return state; 
  }
};
export default reducer;
