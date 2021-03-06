import React from "react";
import { NavLink } from "react-router-dom";
import { initialize } from "../../utils/wallet";
import useAuth from "../../hooks/useAuth";

initialize();

const Header: React.FC<Record<string, never>> = () => {
  const { connect, account, loading } = useAuth();

  const connectWallet = () => {
    connect();
  };

  return (
    <header className="flex flex-wrap items-center justify-between md:h-16 px-2 md:px-12 py-2 md:py-4 shadow-sm shadow-gat-green/10 relative z-1 text-xs w-full">
      <img src="/logo.svg" className="h-6 order-1" />
      <nav className="flex-1 w-full md:w-auto flex items-center justify-center order-3 md:order-2 mt-4 md:mt-0">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gat-green/10" : ""
            } rounded-full py-2 w-28 text-center font-bold`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="../challenges"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gat-green/10" : ""
            } rounded-full py-2 w-28 text-center font-bold mx-2`
          }
        >
          GreenActions
        </NavLink>
        {/* <NavLink
          to="/marketplace"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gat-green/10" : ""
            } rounded-full py-2 w-28 text-center font-bold`
          }
        >
          Marketplace
        </NavLink> */}
      </nav>
      <button
        className="border border-gat-green px-6 md:px-12 py-2 rounded-full font-bold order-2 md:order-3"
        onClick={connectWallet}
      >
        {account ? account : loading ? "Connecting..." : "Connect Wallet"}
      </button>
    </header>
  );
};

export default Header;
