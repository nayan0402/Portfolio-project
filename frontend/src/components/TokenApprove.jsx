import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Etherscan API URL
const etherscanUrl = "https://api-sepolia.etherscan.io/api";
const walletAddress = "0x267d828e6ffB63973254dd7a29C700f5d8CEd722"; // Your wallet address
const apiKey = "MDQ6ZSC8Q6DT8C7CFGP7X74XZH7Z2NZ4AE"; // Replace with your Etherscan API key

const ApprovalTransactions = () => {
  const [approvalTransactions, setApprovalTransactions] = useState([]);

  // Function to fetch approval transactions
  const fetchApprovalTransactions = async () => {
    try {
      const response = await axios.get(etherscanUrl, {
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

      // Function signature for "approve" (ERC-20)
      const approveFunctionSignature = '0x095ea7b3';

      transactions.forEach(tx => {
        if (tx.input.startsWith(approveFunctionSignature)) {
          const spenderHex = tx.input.slice(34, 74); // Extracting the spender address
          const spenderAddress = `0x${spenderHex}`; // Format to checksum address
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
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col md:p-20 py-12 px-4 w-full">
        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 mb-6">
          Approval Transactions
        </h1>

        {/* Display the approval transactions or message when empty */}
        <div className="w-full">
          {approvalTransactions.length === 0 ? (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalTransactions;
