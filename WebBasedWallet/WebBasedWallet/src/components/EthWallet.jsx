import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { Wallet, HDNode } from "ethers";

export function EthWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    return (
        <div>
            <button
                onClick={async function () {
                    const seed = mnemonicToSeedSync(mnemonic);
                    const hdNode = HDNode.fromSeed(seed);
                    const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
                    const child = hdNode.derivePath(derivationPath);
                    const wallet = new Wallet(child.privateKey);
                    setCurrentIndex(currentIndex + 1);
                    setAddresses([...addresses, wallet.address]);
                }}
            >
                Add ETH wallet
            </button>
            {addresses.map((address, index) => (
                <div key={index}>
                    ETH - {address}
                </div>
            ))}
        </div>
    );
}

export default EthWallet;
