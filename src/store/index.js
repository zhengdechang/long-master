import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import App from "store/reducer/app";

const reducers = {
    app: App
};

const store = applyMiddleware(thunk)(createStore)(combineReducers(reducers));
export default store;

// 调用方式
// const dispatch = useDispatch();

// //    const loading = useSelector((state) => state.app.loading);

// const changeLoadings = () => {
//     dispatch(changeLoading(true));
// }

// const test =  () => {
//     changeLoadings()
// };
