import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { RiWallet2Fill } from 'react-icons/ri';

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-col justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl w-full sm:w-[300px] h-[200px]">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="mt-3 flex flex-col justify-center items-center text-center">
      <h3 className="text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center">
    <div className="flex md:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      {/* Title and Description on the left */}
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
          Services we improve
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          Krypt is the ultimate platform to effortlessly manage your unique crypto portfolio, 
          offering a range of super-friendly services designed to enhance your investment experience. 
        </p>
      </div>

      {/* Service Cards on the right */}
      <div className="flex-1 flex flex-wrap justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security guarantee"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products."
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Your Custom WatchList"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Create your very own Custom Watchlist for Different Tokens"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Connect Wallet"
          icon={<RiWallet2Fill fontSize={21} className="text-white" />}
          subtitle="Connect your Metamask Wallet with Crypt and explore more features."
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fastest transactions"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Connect your Wallet with Crypt and do faster Transactions"
        />
      </div>
    </div>
  </div>
);

export default Services;
