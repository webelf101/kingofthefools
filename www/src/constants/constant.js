const BigNumber = require('bignumber.js');

export const NETWORK = {
    MAIN: 1,
    ROPSTEN: 3,
    RINKEBY: 4,
    GOERLI: 5,
    KOVAN: 42,
};

export const getNetworkChainId = () => {
    if (process.env.NODE_ENV === "production") {
        return NETWORK.MAIN;
    }
    return NETWORK.GOERLI;
};

export const getWalletAddressEllipsis = (address, head = 6, tail = 4) => {
    return `${address.substring(0, head)}...${address.substring(address.length - tail)}`;
};

export const shiftedByDecimal = (amount, decimal) => {
    const value = new BigNumber(amount);
    return value.shiftedBy(decimal);
};