import React, { useEffect, useState } from 'react';

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

const Transactions = ({ walletAddress }) => {
  const [transactions, setTransactions] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState('sepolia'); // Default to Sepolia

  // Function to fetch transactions from the selected network
  const fetchTransactions = async () => {
    if (!walletAddress || !selectedNetwork) return; // Skip fetching if no wallet address or network is selected

    try {
      const { url, apiKey } = networks[selectedNetwork]; // Use selected network details
      const response = await fetch(`${url}?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`);
      const data = await response.json();

      if (data.status === '1') {
        const allTransactions = data.result.filter(tx =>
          tx.to && tx.txreceipt_status === "1" // Exclude approvals and missing "to" addresses
        ).map((tx) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: parseFloat(tx.value) / 1e18, // Convert Wei to ETH
          timeStamp: new Date(tx.timeStamp * 1000).toLocaleString(),
          isIncoming: tx.to.toLowerCase() === walletAddress.toLowerCase(),
        }));

        setTransactions(allTransactions);
      } else {
        console.error('Error fetching transactions:', data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchTransactions(); // Fetch transactions whenever walletAddress or selectedNetwork changes
  }, [walletAddress, selectedNetwork]); // Add selectedNetwork to dependency array

  return (
    <div className="flex flex-col md:flex-row items-start justify-between md:p-20 py-9 px-4 w-full">
      <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 mb-6">
          Transaction History
        </h1>

        {/* Network Selection Dropdown */}
        <div className="mb-4">
          <label className="text-white text-lg">Select Network:</label>
          <select
            className="ml-2 bg-gray-800 text-white p-2 rounded-md"
            value={selectedNetwork}
            onChange={(e) => {
              setSelectedNetwork(e.target.value);
              setTransactions([]); // Clear current transactions when changing network
            }}
          >
            {Object.keys(networks).map((network) => (
              <option key={network} value={network}>
                {networks[network].name}
              </option>
            ))}
          </select>
        </div>

        {/* Display the transactions or message when empty */}
        <div className="flex flex-wrap gap-6 w-full">
          {walletAddress ? (
            transactions.length > 0 ? (
              transactions.map((tx) => (
                <div
                  key={tx.hash}
                  className="bg-gray-700 p-2 rounded-lg shadow-lg w-60" // Smaller width for boxes
                >
                  <p className="text-white">
                    <strong>From:</strong> {tx.from.length > 15 ? `${tx.from.slice(0, 15)}...` : tx.from}
                  </p>
                  <p className="text-white">
                    <strong>To:</strong> {tx.to.length > 15 ? `${tx.to.slice(0, 15)}...` : tx.to}
                  </p>
                  <p className="text-white">
                    <strong>Type:</strong> {tx.isIncoming ? 'In' : 'Out'}
                  </p>
                  <p className="text-white">
                    <strong>Value:</strong> {tx.value} ETH
                  </p>
                  <p className="text-white">
                    <strong>Date:</strong> {tx.timeStamp}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <h2 className="text-2xl sm:text-3xl text-white text-gradient py-1 mb-6">
                  No transactions found!
                </h2>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center w-full">
              <h2 className="text-2xl sm:text-3xl text-white text-gradient py-1 mb-6">
                Connect your wallet to see transaction history.
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
