import React from "react";

import BankAccount from "../components/homePageCards/BankAccount";
import GreenActivistNFT from "../components/homePageCards/GreenActivistNFT";

type HomePageCard = {
  title: React.ReactElement;
  image: string;
  content: React.ReactElement | string;
  buttonText: string;
  buttonAction: () => unknown;
};

const Home: React.FC<Record<string, never>> = () => {
  const letsGreenAct = () => {
    console.log("Let's greenact");
  };

  const homePageCards: Array<HomePageCard> = [
    {
      title: (
        <h6 className="font-bold text-xl">
          My Green<span className="text-gat-green">Actions</span>
        </h6>
      ),
      image: "/actions.png",
      content: (
        <div className="text-xs text-center">
          <p>
            If you’ve already safely connected your bank accounts to GreenAct
            and chosen your GreenActivist, you can start playing!{" "}
          </p>

          <p className="mt-3">Complete GreenActions to earn tokens!</p>
        </div>
      ),
      buttonText: "Let's GreenAct",
      buttonAction: letsGreenAct,
    },
  ];
  return (
    <div className="h-full w-full px-8 md:px-12">
      <h1 className="text-3xl font-bold text-center py-8">
        Understand you footprint, <span className="text-gat-green">Act</span> to
        reduce it and <span className="text-gat-green">Earn</span>!
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-28 md:space-y-0">
        <BankAccount />
        <GreenActivistNFT />
        {homePageCards.map(
          ({ title, image, content, buttonText, buttonAction }, index) => {
            return (
              <div
                className="flex flex-col items-center rounded-xl bg-white border border-gat-green shadow-md shadow-black/20 h-[500px] w-full md:w-1/3 md:max-w-[300px] px-12 py-5"
                key={index}
              >
                {title}
                <img src={image} className="h-[130px] my-4" />
                <div className="flex-1">{content}</div>
                <button
                  className="border border-gat-green w-full py-1 rounded-full font-bold text-xs"
                  onClick={buttonAction}
                >
                  {buttonText}
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Home;
