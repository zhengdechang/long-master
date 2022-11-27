import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import app from "store/reducer/app";
import cornerstone from "store/reducer/cornerstone";

const reducers = {
    app,
    cornerstone,
};



const store = applyMiddleware(thunk)(createStore)(combineReducers(reducers));
export default store;

// 调用方式
// const dispatch = useDispatch();

 //    const loading = useSelector((state) => state.app.loading);

// const changeLoadings = () => {
//     dispatch(changeLoading(true));
// }

// const test =  () => {
//     changeLoadings()
// };
