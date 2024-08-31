import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import React, { useState } from 'react';

export const Airdrop = () => {
    const [amount, setAmount] = useState('');
    const wallet = useWallet();
    const { connection } = useConnection();


    async function handleAirdrop() {

        const airdropAmount = parseFloat(amount) * 1000000000;


        if (isNaN(airdropAmount) || airdropAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            // Request airdrop
            await connection.requestAirdrop(wallet.publicKey, airdropAmount);
            alert("Airdrop successful!");
            setAmount('');
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("Airdrop failed. Please try again.");
        }
    }

    return (
        <div className="flex flex-col items-center">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
                onClick={handleAirdrop}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                Send Airdrop
            </button>
        </div>
    );
};
