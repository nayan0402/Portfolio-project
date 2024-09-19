import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
// import { TransactionContext } from "../context/TransactionContext";
// import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const companyCommonStyles = "min-h-[100px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Welcome = () => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const connectWallet = async () => {
    
  };

  // Check if wallet is already connected
  const checkIfWalletIsConnected = async () => {
    
  };

  // Call this function on component mount
 

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col md:flex-row items-start justify-between md:p-20 py-12 px-4 w-full">
        {/* Left section with text */}
        <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Track Trade Triumph <br /> Your Crypto, Your Control
          </h1>
          <p className="text-left mt-6 text-white font-light md:w-6/12 w-11/12 text-base">
            Manage your portfolio easily and make smarter decisions with Krypt.
          </p>
          <button
            type="button"
            onClick={connectWallet}
            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] px-10 py-4 w-[400px] rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            <p className="text-white text-base font-semibold">
              {currentAccount ? "Wallet Connected" : "Connect Wallet"}
            </p>
          </button>

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-16">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Transfer Tokens
            </div>
            <div className={companyCommonStyles}>Performance Analysis</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Data Tracking
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Connect Wallet
            </div>
            <div className={companyCommonStyles}>WatchList</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Portfolio Tracking
            </div>
          </div>
        </div>

        {/* Right section with card */}
        <div className="flex flex-col flex-1 items-center justify-start w-full md:w-auto md:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-60 w-[22rem] w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {currentAccount
                    ? currentAccount
                    : "Connect your wallet to see address"}
                </p>
                <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={() => {}} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={() => {}} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={() => {}} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={() => {}} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {false ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={() => {}}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
