import React, { useEffect, useState } from 'react';

const Transactions = ({ walletAddress }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const apiKey = 'MDQ6ZSC8Q6DT8C7CFGP7X74XZH7Z2NZ4AE'; // Replace with your Etherscan API key
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
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
    if (walletAddress) {
      fetchTransactions();
    }
  }, [walletAddress]);

  return (
    <div className="flex flex-col md:flex-row items-start justify-between md:p-20 py-9 px-4 w-full">
      <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
      <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 mb-6">
            Transaction History
          </h1>

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
