import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from './utils/WavePortal.json';

function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [numberOfWaves, setnumberOfWaves] = useState("");
  const [hasWaved, setHasWaved] = useState(false);

  const contractAddress = "0x4B1aa23d060e2544211CE92cF00297FECe880146";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        setnumberOfWaves(count.toNumber());
        setHasWaved(true);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


  return (
    <div className="flex justify-center w-full mt-10">

      <div className='w-6/12'>
        <div className="mt-2 mb-4 text-2xl">
        👋 Hey there!
        </div>

        <div>
        I am Rumen and I'm a frontend developer, learning Solidity! Connect your Ethereum wallet and wave at me!
        </div>

        <div className="flex flex-col justify-evenly mt-10">
          <button className='bg-lime-500 rounded py-2 px-2 mt-3 mr-auto ml-auto w-3/5' onClick={wave}>
            Wave at Me
          </button>

          {!currentAccount && (
            <button className='bg-red-500 rounded py-2 px-2 mt-3 mr-auto ml-auto w-3/5' onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>

          {hasWaved && <p>
            Total number of waves: {numberOfWaves}
          </p>}
      </div>
    </div>
  );
}

export default App;
