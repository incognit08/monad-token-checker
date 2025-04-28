require('dotenv').config();
const { ethers } = require('ethers');
const readlineSync = require('readline-sync');

// Monad Testnet RPC URL
const MONAD_RPC_URL = process.env.MONAD_RPC_URL;

// Ask for wallet address
const walletAddress = readlineSync.question('Enter the wallet address to check: ');

// Connect to Monad Testnet
const provider = new ethers.JsonRpcProvider(MONAD_RPC_URL);

// ERC20 Token Contract ABI (only balanceOf and symbol needed)
const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function symbol() view returns (string)"
];

// List of tokens to check (add token contract addresses here)
const tokens = [
    {
        address: "0x164fd2c25e0d7c28496911f8f83649972F93a1d2"  // <-- replace this with actual token address
    },  {
        address: "0x875db42Cda3Fe8560DfFECf3CE9D99EeC2aAF841"
    }, {
        address: "0x5642c8e3CCC657701f1201eFd2C45f9567bF13A0"
    }, 

    // You can add more token addresses here if needed
];

async function checkWalletTokens() {
    try {
        console.log(`🔎 Checking wallet: ${walletAddress}\n`);

        for (const token of tokens) {
            const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
            const balance = await contract.balanceOf(walletAddress);
            const symbol = await contract.symbol();
            console.log(`💠 ${symbol}: ${ethers.formatUnits(balance, 18)} tokens`);
        }

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

checkWalletTokens();

