//interact.js
require("dotenv").config();
const { ethers } = require("ethers");
const API_KEY = process.env.API_KEY;
const ***REMOVED*** = process.env.***REMOVED***;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contract = require("./greenhacktoken.json");
console.log(JSON.stringify(contract));

// Provider
const provider = new ethers.providers.InfuraProvider(
  (network = "maticmum"),
  API_KEY
);
// Signer
const signer = new ethers.Wallet(***REMOVED***, provider);
// Contract
const greenHackTokenContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract,
  signer
);

async function reward(amount_ghk, to) {
  amount = ethers.utils.parseUnits(amount_ghk, "18");
  const tx = await greenHackTokenContract.mint(to, amount);
  console.log(amount_ghk + " GHK have been minted for " + to);
}

reward("5", "0xa4437699EA5A31E85546fcc634f46E164E2D1246");
