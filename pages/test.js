const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('https://arb1.arbitrum.io/rpc');
const web3 = new Web3(provider);

const contractAddress = '0x123...'; // Replace with the actual contract address
const contractAbi = [{}]; // Replace with the actual contract ABI

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Call a contract function to retrieve data
contract.methods.getClaimers().call((error, result) => {
  if (error) {
    console.error(error);
  } else {
    // Process the retrieved data
    console.log(result);
  }
});
