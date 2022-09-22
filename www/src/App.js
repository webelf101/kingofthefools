import React from 'react';
import {
    BrowserRouter
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { MetaMaskProvider } from "metamask-react";
import { getNetworkChainId } from "./constants/constant";

import "react-toastify/dist/ReactToastify.css";
import Routes from './routes/Routes';

const App = () => {
    return (
        <div className="sub-body">
            <MetaMaskProvider chainId={getNetworkChainId()}>
                <BrowserRouter>
                    <Routes />
                    <ToastContainer />
                </BrowserRouter>
            </MetaMaskProvider>
        </div>
    );
};

export default App;

