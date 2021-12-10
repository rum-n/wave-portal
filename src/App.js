import './App.css';
import * as React from "react";
// import { ethers } from "ethers";

function App() {
  const wave = () => {
    
  }

  return (
    <div className="flex justify-center w-full mt-10">

      <div className='w-6/12'>
        <div className="">
        👋 Hey there!
        </div>

        <div>
        I am Rumen and I'm a frontend developer, learning Solidity! Connect your Ethereum wallet and wave at me!
        </div>

        <button className='bg-gray-400 rounded py-1 px-1.5 mt-3 mr-auto ml-auto' onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}

export default App;
