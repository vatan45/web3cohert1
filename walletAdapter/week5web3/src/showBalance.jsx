import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";

export function ShowSolBalance() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        let intervalId;

        async function getBalance() {
            if (publicKey) {
                try {
                    const balance = await connection.getBalance(publicKey);
                    setBalance(balance / LAMPORTS_PER_SOL);
                } catch (error) {
                    console.error("Failed to fetch balance:", error);
                    setBalance(null);
                }
            } else {
                setBalance(null);
            }
        }

        getBalance();

        // Update balance every 10 seconds
        intervalId = setInterval(getBalance, 1000);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [connection, publicKey]);

    return (
        <div className="bg-violet-300 text-violet-900 px-3 py-1 rounded-full font-semibold text-sm shadow-md hover:bg-violet-200 transition-colors duration-200">
            Balance: {balance !== null ? `${balance.toFixed(2)} SOL` : 'N/A'}
        </div>
    );
}