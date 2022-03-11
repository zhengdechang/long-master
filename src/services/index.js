import axios from "axios";
import { message } from "antd";
import { changeLoading } from 'store/reducer/app/action'
import store from 'store'


const services = axios.create({
    // 联调
    // baseURL: process.env.NODE_ENV === "production" ? "/" : "/api",
    baseURL: "/",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        userCode: localStorage.getItem("userCode") || ""
    },
    // 是否跨站点访问控制请求
    withCredentials: true,
    timeout: 30000
});


// 请求拦截器
services.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") || "dev"; // 获取token，并将其添加至请求头中
        if (token) config.headers.Authorization = `${token}`;
        // !config.hideLoading && message.loading("加载中...", 1)
        !config.hideLoading && store.dispatch(changeLoading(true))

        return config;
    },
    error => {
        // 错误抛到业务代码
        error.data = { msg: "服务器异常，请联系管理员！" };
        return Promise.resolve(error);
    }
);

// 响应拦截器
services.interceptors.response.use(
    (response) => {
        store.dispatch(changeLoading(false))
        const { headers, data } = response;
        if (headers.token) localStorage.setItem("token", response.data.token);
        // if (data.code < 200 || data.code >= 300 || !data.success || data.code !== "000000") message.error(data.msg);
        data.code !== "000000" ? message.error(data.msg) : message.success(data.msg);
        return data;
    },
    error => {
        store.dispatch(changeLoading(false))
        if (axios.isCancel(error)) {
            console.log("repeated request: " + error.message);
        } else {
            // handle error code
            // 错误抛到业务代码
            error.data = { msg: "请求超时或服务器异常，请检查网络或联系管理员！" };
            message.error(error.message, 1);
        }
        return Promise.reject(error);
    }
);



export default services;