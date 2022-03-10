import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import App from "store/reducer/app";

const reducers = {
    app: App
};

const store = applyMiddleware(thunk)(createStore)(combineReducers(reducers));
export default store;
