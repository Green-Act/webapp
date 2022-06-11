import React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC<Record<string, never>> = () => {
  return (
    <header className="flex items-center justify-between h-16 px-8 py-4">
      <img src="/logo.svg" className="h-full" />
      <nav className="flex-1 flex items-center justify-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gat-gray" : ""
            } rounded-md py-2 w-24 text-center text-sm font-bold`
          }
        >
          Stats
        </NavLink>
        <NavLink
          to="/challenges"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gat-gray" : ""
            } rounded-md py-2 w-24 text-center text-sm font-bold mx-2`
          }
        >
          Challenges
        </NavLink>
        <NavLink
          to="/marketplace"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gat-gray" : ""
            } rounded-md py-2 w-24 text-center text-sm font-bold`
          }
        >
          Marketplace
        </NavLink>
      </nav>
      <button className="bg-gat-green px-8 py-2 rounded-full font-bold">
        Connect Wallet
      </button>
    </header>
  );
};

export default Header;
