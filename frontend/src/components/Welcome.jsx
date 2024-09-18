import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

// import { TransactionContext } from "../context/TransactionContext";
// import { shortenAddress } from "../utils/shortenAddress";
// import { Loader } from ".";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Welcome = () => {

  const connectwallet = ()=>{

  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Track Trade Triumph <br /> Your Crypto in Control
          </h1>
          <p className="text-left mt-6 text-white font-light md:w-6/12 w-11/12 text-base">
          Manage your portfolio effortlessly, stay updated on market trends, and make smarter investment decisions in real-time with Krypt.
          </p>
          <button
          type="button"
          onClick={connectwallet}
          className="flex flex-row justify-center items-center my-5 bg-[#2952e3] px-10 py-3 w-[400px] rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Transfer Tokens
            </div>
            <div className={companyCommonStyles}>Performance Analysis</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Data Tracking
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              ConnectWallet
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Portfolio Tracking
            </div>
          </div>
        </div>
        </div>
      </div>
    // </div>
  );
};

export default Welcome;