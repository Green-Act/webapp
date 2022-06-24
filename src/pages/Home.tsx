import React from "react";

import BankAccount from "../components/homePageCards/BankAccount";
import GreenActions from "../components/homePageCards/GreenActions";
import GreenActivistNFT from "../components/homePageCards/GreenActivistNFT";

import ActivismDetails from "../components/ActivismDetails";

const Home: React.FC<Record<string, never>> = () => {
  const [showBankDetails, setShowBankDetails] = React.useState<boolean>(false);

  return (
    <div className="h-full w-full px-8 md:px-12">
      {showBankDetails && (
        <ActivismDetails setShowDetails={setShowBankDetails} />
      )}
      <h1 className="text-3xl font-bold text-center py-8">
        <span className="text-gat-green">Act</span> to reduce your carbon
        footprint and <span className="text-gat-green">Earn</span>!
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-28 md:space-y-0">
        <GreenActivistNFT />
        <GreenActions />
        <BankAccount setShow={setShowBankDetails} />
      </div>
    </div>
  );
};

export default Home;
