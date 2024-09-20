import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define available networks and their respective API URLs and keys
const networks = {
  sepolia: {
    name: "Sepolia Testnet",
    url: "https://api-sepolia.etherscan.io/api",
    apiKey: "MDQ6ZSC8Q6DT8C7CFGP7X74XZH7Z2NZ4AE" // Replace with your Sepolia Etherscan API key
  },
  mainnet: {
    name: "Ethereum Mainnet",
    url: "https://api.etherscan.io/api",
    apiKey: "MDQ6ZSC8Q6DT8C7CFGP7X74XZH7Z2NZ4AE" // Replace with your Mainnet Etherscan API key
  },
  rinkeby: {
    name: "Rinkeby Testnet",
    url: "https://api-rinkeby.etherscan.io/api",
    apiKey: "MDQ6ZSC8Q6DT8C7CFGP7X74XZH7Z2NZ4AE" // Replace with your Rinkeby Etherscan API key
  },
  holesky: {
    name: "Holesky Testnet",
    url: "https://api-holesky.etherscan.io/api", // Replace with Holesky Etherscan-like API URL if available
    apiKey: "MDQ6ZSC8Q6DT8C7CFGP7X74XZH7Z2NZ4AE" // Replace with your Holesky Etherscan-like API key
  }
};

const TokenApprove = ({ walletAddress }) => {
  const [approvalTransactions, setApprovalTransactions] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState('sepolia');

  // Function to fetch approval transactions
  const fetchApprovalTransactions = async () => {
    if (!walletAddress) return; // If no wallet address, skip fetching

    try {
      const { url, apiKey } = networks[selectedNetwork];

      const response = await axios.get(url, {
        params: {
          module: 'account',
          action: 'txlist',
          address: walletAddress,
          startblock: 0,
          endblock: 99999999,
          sort: 'asc',
          apikey: apiKey
        }
      });

      const transactions = response.data.result;
      const approvalTransactionsList = [];
      const approveFunctionSignature = '0x095ea7b3'; // Function signature for approval

      transactions.forEach(tx => {
        if (tx.input.startsWith(approveFunctionSignature)) {
          const spenderHex = tx.input.slice(34, 74);
          const spenderAddress = `0x${spenderHex}`;
          approvalTransactionsList.push({
            ...tx,
            spender: spenderAddress
          });
        }
      });

      setApprovalTransactions(approvalTransactionsList);
    } catch (error) {
      console.error("Error fetching approval transactions:", error);
    }
  };

  useEffect(() => {
    fetchApprovalTransactions();
  }, [walletAddress, selectedNetwork]);

  return (
    <div className="flex flex-col md:flex-row items-start justify-between md:p-20 py-9 px-4 w-full">
      <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 mb-6">
          Approved Allowance Tokens
        </h1>

        {/* Network Selection Dropdown */}
        <div className="mb-4">
          <label className="text-white text-lg">Select Network:</label>
          <select
            className="ml-2 bg-gray-800 text-white p-2 rounded-md"
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
          >
            {Object.keys(networks).map((network) => (
              <option key={network} value={network}>
                {networks[network].name}
              </option>
            ))}
          </select>
        </div>

        {/* Display the approval transactions or message when empty */}
        <div className="w-full">
          {walletAddress ? (
            approvalTransactions.length === 0 ? (
              <div className="flex justify-center items-center h-20">
                <h2 className="text-2xl sm:text-3xl text-white text-gradient py-1 mb-6">
                  No approval transactions found!
                </h2>
              </div>
            ) : (
              <table className="min-w-full bg-gray-800 text-white rounded-md shadow-md">
                <thead>
                  <tr className="text-left">
                    <th className="p-4">Block</th>
                    <th className="p-4">From</th>
                    <th className="p-4">Spender</th>
                    <th className="p-4">Value (Wei)</th>
                    <th className="p-4">TxHash</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalTransactions.map((tx, index) => (
                    <tr key={index} className="bg-gray-700 hover:bg-gray-600">
                      <td className="p-4">{tx.blockNumber}</td>
                      <td className="p-4">{tx.from}</td>
                      <td className="p-4">{tx.spender}</td>
                      <td className="p-4">{tx.value}</td>
                      <td className="p-4">
                        <a
                          href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {tx.hash.substring(0, 10)}...
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            <div className="flex justify-center items-center h-20">
              <h2 className="text-2xl sm:text-3xl text-white text-gradient py-1 mb-6">
                Please connect your wallet.
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenApprove;
