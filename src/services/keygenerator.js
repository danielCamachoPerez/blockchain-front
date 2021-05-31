const cw = require("crypto-wallets");
const { ec } = require("elliptic");
const EC = new ec("secp256k1");

export const myKey = () => {
    const key = EC.genKeyPair();
    const publicKey = key.getPublic("hex");
    const privateKey = key.getPrivate("hex");

    return { publicKey, privateKey };
};

export const bitcoinWallet = () => {
    const bitcoinWallet = cw.generateWallet("BTC");
    const bitcoinAddress = bitcoinWallet.address;
    const bitcoinSign = bitcoinWallet.privateKey;

    return { bitcoinAddress, bitcoinSign };
};

export const ethereumWallet = () => {
    const ethereumWalelt = cw.generateWallet("ETH");
    const ethereumAddres = ethereumWalelt.address;
    const ethereumSign = ethereumWalelt.privateKey;

    return { ethereumAddres, ethereumSign };
};