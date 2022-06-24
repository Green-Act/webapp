import React from "react";

const Howitworks: React.FC<Record<string, never>> = () => {
  return (
    <div className="w-[30%] h-fit border-[1px] border-gat-green rounded-xl  bg-white shadow-md shadow-black/20 py-2 px-4 mx-10 my-4">
      <p className="font-bold text-xl">How it works</p>
      <br />
      <p className="font-bold text-lg">Act</p>
      <p className="text-sm">
        - All challenges last 7 days and start on Saturday.
      </p>
      <p className="text-sm">
        - By Friday evening, you need to have selected the challenges you want
        to take on the following week.
      </p>
      <p className="text-sm">
        - Challenges are presented on the side, you can consult them and
        participate!
      </p>
      <br />
      <p className="font-bold text-lg">Earn</p>
      <p className="text-sm">
        - When you complete a challenge, you are rewarded with GreenAct tokens.
        Those GreenAct tokens allow you to level up your GreenActivist NFT.
      </p>
      <p className="text-sm">
        - The probability of winning the Reward pool is a function of: (1) the
        MATICs that you had at stake for your completed challenges and (2) the
        level of your NFT
      </p>
      <br />
      <p className="font-bold text-lg">Stake to commit</p>
      <p className="text-sm">
        - Staking MATIC will motivate you to commit to your challenges.
      </p>
      <p className="text-sm">
        {" "}
        - If you complete your GreenActions, you get your MATICs back and get a
        chance to win the Reward Pool.{" "}
      </p>
      <p className="text-sm">
        - If you fail in completing your GreenActions, you loose your MATICs
        locked. Those MATIC will constitute next weekly lottery, so you can get
        them back by participating to next week challenges!{" "}
      </p>
    </div>
  );
};

export default Howitworks;
