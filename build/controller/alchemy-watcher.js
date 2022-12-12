"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Setup
const alchemy_sdk_1 = require("alchemy-sdk");
const settings = {
    apiKey: "XWJmf8dxIfaF71VS0e5Uz5hiP_k_qNNw",
    network: alchemy_sdk_1.Network.ETH_MAINNET,
};
const alchemy = new alchemy_sdk_1.Alchemy(settings);
// Get the latest block
const latestBlock = alchemy.core.getBlockNumber();
console.log('latest block', latestBlock);
// Get all outbound transfers for a provided address
alchemy.core
    .getTokenBalances('0x994b342dd87fc825f66e51ffa3ef71ad818b6893')
    .then(console.log);
// // Get all the NFTs owned by an address
// const nfts = alchemy.nft.getNftsForOwner("0xshah.eth");
// // Listen to all new pending transactions
// alchemy.ws.on(
//     { method: "alchemy_pendingTransactions",
//     fromAddress: "0xshah.eth" },
//     (res) => console.log(res)
// );
