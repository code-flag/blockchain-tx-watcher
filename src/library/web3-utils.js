
const Web3 = require("web3")

// Create a sha3 hash of a string input
Web3.utils.sha3("example") // '0x6fd43e7cffc31bb581d7421c8698e29aa2bd8e7186a394b85299908b4eb9b175'

// Convert any ether value into wei
 Web3.utils.toWei('1', 'ether') // 1000000000000000000
 Web3.utils.toWei('1', 'gwei') // 1000000000

// Adds a padding on the left of a string, useful for adding paddings to HEX strings.
Web3.utils.padLeft('0x3456ff', 20); // '0x000000000000003456ff'