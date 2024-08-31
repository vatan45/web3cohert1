import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState, useEffect } from "react";

export function SendSolana() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, connected } = useWallet();
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        console.log("Wallet connected:", connected);
        console.log("Public key:", publicKey?.toBase58());
    }, [connected, publicKey]);

    async function handleSend() {
        if (!publicKey) {
            alert("Please connect your wallet!");
            return;
        }

        if (!to || !amount) {
            alert("Please enter both recipient address and amount!");
            return;
        }

        try {
            console.log("Sending transaction...");
            console.log("From:", publicKey.toBase58());
            console.log("To:", to);
            console.log("Amount:", amount);

            const toPublicKey = new PublicKey(to);
            const amountInLamports = Math.round(parseFloat(amount) * LAMPORTS_PER_SOL);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: toPublicKey,
                    lamports: amountInLamports,
                })
            );

            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            console.log("Transaction created, sending...");
            const signature = await new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        const sig = await sendTransaction(transaction, connection);
                        resolve(sig);
                    } catch (err) {
                        reject(err);
                    }
                }, 1000); // 1 second delay
            });
            console.log("Transaction sent:", signature);

            const result = await connection.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight
            });

            if (result.value.err) {
                throw new Error('Transaction failed: ' + result.value.err.toString());
            }

            alert(`Sent ${amount} SOL to ${to}\nTransaction signature: ${signature}`);
            setTo('');
            setAmount('');
        } catch (error) {
            console.error("Error sending transaction:", error);
            alert(`Failed to send: ${error.message}`);
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor="to" className="text-white text-sm font-medium">
                    Recipient Address:
                </label>
                <input
                    id="to"
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Enter recipient's Solana address"
                    className="w-full px-3 py-2 text-violet-900 bg-violet-100 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="amount" className="text-white text-sm font-medium">
                    Amount (SOL):
                </label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount in SOL"
                    className="w-full px-3 py-2 text-violet-900 bg-violet-100 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
            </div>
            <button
                onClick={handleSend}
                disabled={!publicKey}
                className="w-full px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
            >
                Send SOL
            </button>
        </div>
    );
}