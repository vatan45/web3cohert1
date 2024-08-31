import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React, { useState } from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState('');

    async function handleSign() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        try {
            const encodedMessage = new TextEncoder().encode(message);
            const signatureBytes = await signMessage(encodedMessage);

            if (!ed25519.verify(signatureBytes, encodedMessage, publicKey.toBytes())) {
                throw new Error('Message signature invalid!');
            }

            const signatureBase58 = bs58.encode(signatureBytes);
            setSignature(signatureBase58);
        } catch (error) {
            console.error('Signing failed:', error);
            alert(`Signing failed: ${error.message}`);
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-white text-sm font-medium">
                    Enter your message:
                </label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here"
                    className="w-full px-3 py-2 text-violet-900 bg-violet-100 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
                    rows="4"
                />
            </div>
            <button
                onClick={handleSign}
                disabled={!publicKey}
                className="w-full px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
            >
                Sign Message
            </button>
            {signature && (
                <div className="mt-4 p-3 bg-violet-100 rounded-md">
                    <h4 className="text-violet-900 font-semibold mb-2">Signature:</h4>
                    <p className="text-violet-800 break-all">{signature}</p>
                </div>
            )}
        </div>
    );
}