import { LOADING } from "./actionTypes";

const initialState = {
  loading: false,
  // isLogin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.data };
    default:
      return state; 
  }
};
export default reducer;
