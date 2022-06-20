import React from "react";

const ChallengeCard: React.FC<Record<string, never>> = (props) => {
  return (
    <div className="flex flex-col items-center justify-between rounded-xl bg-white border border-gat-green shadow-md shadow-black/20 mx-8 my-4 h-[240px] w-[240px]">
      <div className="flex flex-row justify-between border-b-[1px] border-gat-green w-full px-4 py-2 text-base font-medium">
        <div className="text-left font-semibold">{props.category}</div>
        <div className="text-right font-semibold">Level {props.level}</div>
      </div>
      <div className="flex flex-col w-full justify-start px-4 py-4">
        <div className="text-left text-base font-semibold">Challenge</div>
        <div className="text-left text-xs">{props.description}</div>
      </div>
      <div className="flex flex-row justify-between w-[90%] mt-auto border-[1px] border-gat-green rounded-md bg-green-100 px-4 py-2 text-base font-medium">
        <div className="text-left">Reward</div>
        <div className="text-right ml-auto">{props.reward}</div>
        <img src="/leaf.svg" className="pl-2" />
      </div>
      <button className="border-2 border-gat-green w-[100px] py-1 rounded-full font-bold text-xs mb-2 my-2">
        {" "}
        Submit!{" "}
      </button>
    </div>
  );
};
export default ChallengeCard;
