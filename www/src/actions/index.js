import axios from "axios";
import { ETH_AMOUNT, BECOME_KING } from "./types";
import { getWeb3, getGasFee } from '../services/web3';

export const BecomeKing =
    (contract) => async (dispatch) => {
        try {
            const web3 = await getWeb3();
            const account = await web3.eth.getAccounts();
            const Contract = await new web3.eth.Contract(contract.abi, contract.address);
            const ethValue = await Contract.methods.nextAmount().call();
            const gasLimit = await Contract.methods
                .becomeKing()
                .estimateGas({ from: account[0], value: ethValue });

            await Contract.methods.becomeKing()
                .send({
                    from: account[0],
                    gas: getGasFee(gasLimit),
                    value: ethValue
                })
                .then(() => {
                    dispatch({
                        type: BECOME_KING,
                        payload: true,
                    });
                    dispatch(GetETHAmount(contract));
                });
        } catch (error) {
            console.log('error', error);
            dispatch({
                type: BECOME_KING,
                payload: false
            });
        }
    };

export const GetETHAmount =
    (contract) => async (dispatch) => {
        try {
            const web3 = await getWeb3();
            const Contract = await new web3.eth.Contract(contract.abi, contract.address);
            await Contract.methods.nextAmount()
                .call()
                .then((data) => {
                    dispatch({
                        type: ETH_AMOUNT,
                        payload: data,
                    });
                })
                .catch((error) => {
                    console.log('error', error);
                    return error;
                });
        } catch (error) {
            console.log("error", error);
            return error;
        }
    };
