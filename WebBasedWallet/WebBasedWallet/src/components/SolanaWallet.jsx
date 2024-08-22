import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import * as ed25519 from "@noble/ed25519";

// Ensure Buffer is polyfilled
import { Buffer } from 'buffer';
window.Buffer = Buffer;

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    return (
        <div>
            <button
                onClick={async function () {
                    const seed = mnemonicToSeedSync(mnemonic);
                    const path = `m/44'/501'/${currentIndex}'/0'`;
                    const derivedSeed = ed25519.utils.concat([seed, Buffer.from(path)]); // Example path handling, adjust as needed
                    const keypair = Keypair.fromSecretKey(
                        ed25519.utils.concat([seed, derivedSeed])
                    );
                    setCurrentIndex(currentIndex + 1);
                    setPublicKeys([...publicKeys, keypair.publicKey]);
                }}
            >
                Add wallet
            </button>
            {publicKeys.map((p, index) => (
                <div key={index}>{p.toBase58()}</div>
            ))}
        </div>
    );
}

export default SolanaWallet;
import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import * as ed25519 from "@noble/ed25519";

// Ensure Buffer is polyfilled
import { Buffer } from 'buffer';
window.Buffer = Buffer;

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    return (
        <div>
            <button
                onClick={async function () {
                    const seed = mnemonicToSeedSync(mnemonic);
                    const path = `m/44'/501'/${currentIndex}'/0'`;
                    const derivedSeed = ed25519.utils.concat([seed, Buffer.from(path)]); // Example path handling, adjust as needed
                    const keypair = Keypair.fromSecretKey(
                        ed25519.utils.concat([seed, derivedSeed])
                    );
                    setCurrentIndex(currentIndex + 1);
                    setPublicKeys([...publicKeys, keypair.publicKey]);
                }}
            >
                Add wallet
            </button>
            {publicKeys.map((p, index) => (
                <div key={index}>{p.toBase58()}</div>
            ))}
        </div>
    );
}

export default SolanaWallet;
import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import * as ed25519 from "@noble/ed25519";

// Ensure Buffer is polyfilled
import { Buffer } from 'buffer';
window.Buffer = Buffer;

function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    return (
        <div>
            <button
                onClick={async function () {
                    const seed = mnemonicToSeedSync(mnemonic);
                    const path = `m/44'/501'/${currentIndex}'/0'`;
                    const derivedSeed = ed25519.utils.concat([seed, Buffer.from(path)]); // Example path handling, adjust as needed
                    const keypair = Keypair.fromSecretKey(
                        ed25519.utils.concat([seed, derivedSeed])
                    );
                    setCurrentIndex(currentIndex + 1);
                    setPublicKeys([...publicKeys, keypair.publicKey]);
                }}
            >
                Add wallet
            </button>
            {publicKeys.map((p, index) => (
                <div key={index}>{p.toBase58()}</div>
            ))}
        </div>
    );
}

// Remove the default export since it's already defined at the beginning of the file
export default SolanaWallet;