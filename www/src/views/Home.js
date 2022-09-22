import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useMetaMask } from "metamask-react";
import MetaMaskOnboarding from '@metamask/onboarding';
import { getNetworkChainId, getWalletAddressEllipsis, shiftedByDecimal } from "../constants/constant";
import { BecomeKing, GetETHAmount } from "../actions";
import { Contract } from "../contracts/contract";

import Button from "../components/Button";

function Home() {
    const dispatch = useDispatch();
    const { status, connect, account, chainId } = useMetaMask();
    const [buttonText, setButtonText] = useState('Connect Wallet');
    const [loading, setLoading] = useState(false);

    const { ethAmount, becomeKing } = useSelector((state) => state.collection);
    const onboarding = React.useRef();

    useEffect(() => {
        if (status === "connected") {
            dispatch(GetETHAmount(Contract));
        }
    }, [dispatch, account, status]);

    useEffect(() => {
        if (account && parseInt(chainId, 16) === getNetworkChainId()) {
            setButtonText(getWalletAddressEllipsis(account));
        } else if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
            setButtonText('Install MetaMask');
        } else {
            setButtonText('Connect Wallet');
        }
    }, [account, chainId]);

    useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    useEffect(() => {
        if (status === "connected" && chainId && parseInt(chainId, 16) !== getNetworkChainId()) {
            toast.error('Unsupported network. Please connect with wallet.');
        }
    }, [chainId, status]);


    useEffect(() => {
        if (becomeKing) {
            toast.success("Congratulations! You are a king of the fools now!");
        } else if (becomeKing === false) {
            toast.info("Reverted transaction!");
        }
        setLoading(false);
    }, [becomeKing]);

    const handleConnectWallet = () => {
        if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
            onboarding.current.startOnboarding();
        } else if (status !== "connected") {
            connect();
        } else if (account && parseInt(chainId, 16) === getNetworkChainId()) {
            setButtonText(getWalletAddressEllipsis(account));
        } else if (parseInt(chainId, 16) !== getNetworkChainId()) {
            toast.error('Connect wallet');
        }
    };

    const handleGoClick = () => {
        if (!loading) {
            setLoading(true);
            dispatch(BecomeKing(Contract));
        }
    };

    return (
        <AppWrapper>
            <SectionWrapper>
                <TitleWrapper>King of the fools</TitleWrapper>
                <Button onClick={(e) => handleConnectWallet(e)}>
                    {buttonText}
                </Button>
            </SectionWrapper>
            <SectionWrapper>
                <TypographyWrapper>Price to become a king of the fools : {shiftedByDecimal(ethAmount, -18).toString()} Eth</TypographyWrapper>
            </SectionWrapper>
            <SectionWrapper>
                <Button onClick={() => handleGoClick()}>
                    {loading ? 'Loading...' : `Let's go`}
                </Button>
            </SectionWrapper>
        </AppWrapper>
    );
}

const AppWrapper = styled.div`
    width: 100vw;
    max-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`

const TitleWrapper = styled.h1`
    font-size: 3rem;
`

const TypographyWrapper = styled.p`
    font-size: 1rem;
`

export default Home;