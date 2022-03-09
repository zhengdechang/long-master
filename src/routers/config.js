import React from 'react'


const App = React.lazy(() => import(/* webpackChunkName: "Home" */ "src/App"));
const Login = React.lazy(() => import(/* webpackChunkName: "Login" */ "pages/login"));
const System = React.lazy(() => import(/* webpackChunkName: "Login" */ "pages/system"));
const Home = React.lazy(() => import(/* webpackChunkName: "Login" */ "pages/home"));



// 主路由
export const mainRouteConfig = [
    {
        path: "/", title: "首页", exact: true, component: App,
        children: [
            { path: "/", title: "首页", exact: true, component: Home },
            { path: "/system", title: "系统", exact: true, component: System },
        ]
    },
    { path: "/login", title: "登录", exact: true, component: Login, noAuth: true },
];
