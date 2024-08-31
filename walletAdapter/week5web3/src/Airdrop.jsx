import { useConnection, useWallet } from "@solana/wallet-adapter-react"


export function Airdrop() {

    //hooksin re    act
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendAirdropTouser() {
        await connection.requestAirdrop(wallet.publicKey, 100000000)
        alert("airdropped sol")
    }
    return <div>

        <input placeholder="Amount" type="text" />
        <button onClick={sendAirdropTouser}>Send Airdrops</button>
    </div>
}