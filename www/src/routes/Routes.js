import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../views/Home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Suspense>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default Routes;
