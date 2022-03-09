import * as React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import BaseLoading from "components/BaseLoading";
import App from "src/App";

const renderRouter = (routerList, isLogin) => {
    return routerList.map((item) => {
        const { path, exact, component, noAuth } = item;
        if (!noAuth && !isLogin) return <Redirect to="/login" />;
        return <Route key={path} exact={exact} path={path} component={component} />;
    });
};


const Routers = (props) => {
    const { isLogin = true } = props;
    return (
        <HashRouter>
            <Switch>
                <Route
                    path="/"
                    component={() => {
                        return (
                            <App>
                                <React.Suspense fallback={<BaseLoading />}>
                                    <Switch>
                                        {renderRouter(mainRouteConfig, isLogin)}
                                        <Redirect to="/login" />
                                    </Switch>
                                </React.Suspense>
                            </App>
                        );
                    }}
                />
            </Switch>
        </HashRouter>
    )
}