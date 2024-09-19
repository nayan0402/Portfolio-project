import React from "react";
import { ethers } from "ethers";

const TokenTransferButton = ({ currentAccount, addressTo, amount }) => {
  const handleTransfer = async () => {
    try {
      if (!currentAccount) {
        alert("Please connect your wallet to proceed.");
        return;
      }

      // Check if recipient address and amount are provided
      if (!addressTo || !amount) {
        alert("Please fill in both the recipient address and the amount.");
        return;
      }

      // Check if MetaMask is installed
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature.");
        return;
      }

      // Use ethers to connect to the provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const transaction = {
        to: addressTo,
        value: ethers.utils.parseEther(amount), // Parse amount as Ether
      };

      const txResponse = await signer.sendTransaction(transaction);
      console.log("Transaction sent:", txResponse);
      alert("Transaction sent! Waiting for confirmation...");

      // Wait for the transaction to be mined
      const receipt = await txResponse.wait();
      console.log("Transaction confirmed:", receipt);
      alert("Transaction successful!");
    } catch (error) {
      console.error("Error transferring tokens:", error);
      alert("Error transferring tokens: " + error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleTransfer}
      className="bg-[#2952e3] py-2 px-4 w-full rounded-full text-white font-semibold cursor-pointer hover:bg-[#2546bd]"
    >
      Transfer Tokens
    </button>
  );
};

export default TokenTransferButton;
