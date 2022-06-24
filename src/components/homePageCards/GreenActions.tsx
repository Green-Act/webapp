import React from "react";
import { NavLink } from "react-router-dom";

const GreenActions: React.FC<Record<string, never>> = () => {
  const letsGreenAct = () => {
    console.log("Let's greenact");
  };
  return (
    <div className="flex flex-col items-center rounded-xl bg-white border border-gat-green shadow-md shadow-black/20 h-[500px] w-full md:w-1/3 md:max-w-[300px] px-5 py-5">
      <h6 className="font-bold text-xl">
        My Green<span className="text-gat-green">Actions</span>
      </h6>
      <img src="/actions.png" className="h-[130px] my-4" />
      <div className="flex-1">
        <div className="text-xs text-center">
          <p>
            By commiting to weekly GreenActions, you put some MATICs at stake
            (locked for a week).{" "}
          </p>{" "}
          <br />
          <p>
            If you complete your GreenActions, you get your staked MATICs back
            and get a chance to win the weekly lottery.{" "}
          </p>
          <p>
            If you don’t complete your GreenActions, you loose your MATICs
            staked, which fall into the weekly lottery.{" "}
          </p>{" "}
          <br />
          <p className="font-bold">Current week staking pool: 200 MATIC</p>
        </div>
      </div>
      <NavLink
        className="border border-gat-green text-center w-full py-1 rounded-full font-bold text-xs disabled:text-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
        to="../challenges"
      >
        Let&apos;s GreenAct
      </NavLink>
    </div>
  );
};

export default GreenActions;
