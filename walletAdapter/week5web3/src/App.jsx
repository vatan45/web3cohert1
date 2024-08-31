import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './Airdrop';
import Navbar from './Navbar';
import { SignMessage } from './SignMessage';
import { SendSolana } from './SendSolana'; // Import the SendSolana component

function App() {
  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/RjcF2j4lbiGtOlKxJFFhudJNFyR80qAx"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-400 via-violet-400 to-yellow-200-500">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              {/* Main "Welcome to Air Self" box */}
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-7xl font-bold text-violet-200 mb-8 text-center">WELCOME TO AIR SELF</h2>
                <h4 className="text-2xl font-bold text-black mb-8 text-center">Airdrop your devnet account with sol's and feel rich</h4>
                <div className="flex flex-col items-center space-y-6">
                  <WalletMultiButton className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105" />
                  <WalletDisconnectButton className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105" />
                  <div className="w-full max-w-md">
                    <Airdrop />
                  </div>
                </div>
              </div>

              {/* Two boxes side by side */}
              <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
                {/* Left box: Sign a Message */}
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-violet-200 mb-4 text-center">Sign a Message</h3>
                  <SignMessage />
                </div>

                {/* Right box: Send Solana */}
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-violet-200 mb-4 text-center">Send Solana</h3>
                  <SendSolana />
                </div>
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;