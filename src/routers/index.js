import * as React from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";

import Loading from "components/loading";
import NotFind from "components/notFind";

import { mainRouteConfig } from "./config";

const renderRouter = (routerList, isLogin) => {
    return routerList.map((item) => {
        const { path, exact, noAuth, children } = item;
        if (!noAuth && !isLogin) return <Route path="*" element={<Navigate to="/login" />} />;
        return <Route
            key={path}
            exact={exact}
            path={path}
            element={<item.component />}
        >
            {!!children && children.map(i => {
                return <Route
                    key={i.path}
                    exact={i.exact}
                    path={i.path}
                    element={<i.component />}
                />
            })}
        </Route >;
    });
};


const Routers = (props) => {
    const { isLogin = true } = props;
    return (
        <Router>
            <React.Suspense fallback={<Loading />}>
                <Routes>
                    {renderRouter(mainRouteConfig, isLogin)}
                    < Route path="*" element={<NotFind to="/login" />} />
                </Routes>
            </React.Suspense>
        </Router>
    )
}


export default React.memo(Routers)