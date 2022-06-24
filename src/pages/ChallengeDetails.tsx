import React from "react";

const ChallengeDetails: React.FC<Record<string, never>> = () => {
  return (
    <div>
      <div className="text-3xl font-bold text-center py-8">
        Time to Green<span className="text-gat-green">Act</span>!
      </div>
      <div className="flex flex-row h-full w-full">
        <div className="w-full h-full border-[1px] border-gat-green rounded-xl  bg-white shadow-md shadow-black/20 py-2 px-4 mx-20 my-4">
          <p className="text-sm font-bold">Advocacy</p>
          <p className="text-sm font-bold">Level 0</p>
          <p className="text-sm font-bold">CO2 saved: 0kg</p>
          <br />
          <p className="text-3xl font-bold">
            Share your carbon footprint and how much effort you would like to
            put in reducing it on Twitter.
          </p>
          <br />
          <p className="text-m font-bold">What is expected from you</p>
          <p className="text-sm">
            To fulfill this challenge, you neeed to post a message on Twitter
            mentioning the carbon footprint that you have computed with GreenAct
            and how motivated you are to use GreenAct in the future to help you
            decrease your footprint!
          </p>
          <p className="text-sm">
            Once your message is posted, you will be asked to paste the link in
            a dedicated form in that page.
          </p>
          <br />
          <p className="text-m font-bold">Details</p>
          <p className="text-sm">You have 7 days to fulfill the challenge.</p>
          <p className="text-sm">
            To participate, you need to stake 5 MATIC to fill the staking pool.
          </p>
          <br />
          <p className="text-m font-bold">Note</p>
          <p className="text-sm">
            The experience you will be experiencing is a random simulation (as
            we are not ready to check your challenges yet!)
          </p>
          <br />
          <div className="flex flex-col items-center">
            <button className="border-2 border-gat-green w-[250px] py-1 rounded-full font-bold text-xs">
              I take the challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
