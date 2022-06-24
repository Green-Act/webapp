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
            Complete weekly GreenActions and get a chance to win the Reward
            Pool!{" "}
          </p>{" "}
          <br />
          <div className="flex flex-row justify-between w-full mt-auto border-[1px] border-gat-green rounded-md bg-green-100 px-4 py-1 text-s font-medium">
            <div className="text-left">This week Reward Pool</div>
            <div className="text-right ml-auto">200</div>
            <img src="/polygon.svg" className="pl-2 h-4" />
          </div>
          <br />
          <p>
            The more challenges you take on, and the harder they are, the higher
            your chances to win the prize!
          </p>
          <br />
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
