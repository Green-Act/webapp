import React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC<Record<string, never>> = () => {
  return (
    <header className="flex items-center justify-between h-16 px-12 py-4 shadow-sm shadow-gat-green/10 relative z-1 text-xs">
      <img src="/logo.svg" className="h-8" />
      <nav className="flex-1 flex items-center justify-center">
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
          to="/challenges"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gat-green/10" : ""
            } rounded-full py-2 w-28 text-center font-bold mx-2`
          }
        >
          Challenges
        </NavLink>
        <NavLink
          to="/marketplace"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gat-green/10" : ""
            } rounded-full py-2 w-28 text-center font-bold`
          }
        >
          Marketplace
        </NavLink>
      </nav>
      <button className="border border-gat-green px-12 py-2 rounded-full font-bold">
        Connect Wallet
      </button>
    </header>
  );
};

export default Header;
