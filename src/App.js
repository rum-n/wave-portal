import './App.css';
import * as React from "react";
// import { ethers } from "ethers";

function App() {
  const wave = () => {
    
  }

  return (
    <div className="flex justify-center w-full mt-10">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Rumen and I'm a frontend developer, learning Solidity! Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}

export default App;
