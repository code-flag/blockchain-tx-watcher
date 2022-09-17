const Web3 = require("web3");
    // set a provider in the ropsten testnet using infura
    const web3 = new Web3("https://ropsten.infura.io/v3/endpoint");

    // interacting with the smart contract
    const abi = [
      {
        outputs: [
          {
            internalType: "uint256",
            name: "newValue",
            type: "uint256",
          },
        ],
        name: "getValue",
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const address = "0xe435e2a3cb5dc62c75d8bb2dba8470771405911d";

    // create a new contract object, providing the ABI and address
    const contract = new web3.eth.Contract(abi, address);

    // using contract.methods to get value
    contract.methods
      .getValue()
      .call()
      .then(console.log);