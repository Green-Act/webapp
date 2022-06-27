import React, { useState, useEffect } from "react";
import axios from "axios";
import { useConnectWallet } from "@web3-onboard/react";

type TransactionCard = {
  date: string;
  category: string;
  company: string;
  emissions: number;
};

interface Transaction {
  date: string;
  category: [];
  merchant_name: string;
}

type Props = {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
};

const getEmissions = (): number => Math.floor(Math.random() * 20);

const getEmissionsTotal = (transactions: TransactionCard[]): number => {
  let total = 0;
  transactions.forEach((tx) => (total += tx.emissions));
  return total;
};

const createTransactionArray = (
  plaidTransactions: Transaction[]
): TransactionCard[] => {
  const formattedTransactions = plaidTransactions.map((tx) => {
    return {
      date: tx.date,
      category: tx.category.join(","),
      company: tx.merchant_name,
      // TODO: need to create functionality to generate this value
      emissions: getEmissions(),
    };
  });

  return formattedTransactions;
};

const ActivismDetals: React.FC<Props> = ({ setShowDetails }) => {
  const [{ wallet }] = useConnectWallet();
  const [transactions, setTransactions] = useState<TransactionCard[]>([]);

  const getTransactions = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL ?? "/api"}/api/plaid/transactions/${
        wallet?.accounts[0].address
      }`
    );

    const plaidTransactions = response.data?.transactions;

    // TODO: Error handling...
    if (!plaidTransactions) {
      console.error("Issue fetching data from server...");
    }

    // Format transactions to display the data we want to our user
    const formattedTransactions = createTransactionArray(plaidTransactions);
    setTransactions(formattedTransactions);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="h-full w-full px-8 md:px-12 z-10 absolute top-0 left-0 bg-white">
      <div
        className="absolute top-10 right-10 cursor-pointer"
        onClick={() => setShowDetails(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-center py-8">Your Footprint</h1>
      <div className="md:flex h-[65vh]">
        <div className="flex-1">
          <div className="flex-1">
            <h6 className="font-bold text-base">Last 30 days</h6>
            <div className="flex">
              <h4 className="text-gat-green text-6xl">
                {getEmissionsTotal(transactions)}
              </h4>
              <span>kg CO2eq</span>
            </div>
          </div>
          <div className="h-[60%]"></div>
          <div className="flex-1">
            <h6 className="font-bold text-base">Paris Agreements target</h6>
            <div className="flex align-center">
              <h4 className="text-6xl">700</h4>
              <span className="mr-20">kg CO2eq</span>
              <button className="border border-gat-green py-1 rounded-full font-bold text-xs w-[120px] h-[30px]">
                Offset
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 h-96 md:h-full overflow-auto">
          <h6 className="font-bold text-base">Transactions</h6>
          <ul className="overflow-auto pt-12">
            {transactions.map(
              ({ date, category, company, emissions }, index) => (
                <li
                  key={index}
                  className="flex flex-col justify-between  border-b-2"
                >
                  <p className="text-gray-500 font-light text-sm">{date}</p>
                  <div className="flex pt-3 pb-1 ">
                    <p className="w-1/3 truncate">{category}</p>
                    <p className="w-1/3 truncate text-center">{company}</p>
                    <p className="w-1/3 text-right">{emissions + " kg CO2e"}</p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivismDetals;
