import React from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
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
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const getEmissions = (): number => Math.floor(Math.random() * 20);

const getEmissionsTotal = (transactions: TransactionCard[]): number => {
  let total = 0;
  transactions.forEach((tx) => (total += tx.emissions));
  return total;
};

const BankAccount: React.FC<Props> = ({ setShow }) => {
  // Get link token, this verifies our account credentials,
  // the user must go through their own authentication process
  const [linkToken, setLinkToken] = React.useState<string>("");
  // bank account connected state
  const { bankConnected, getAccessToken, exchangeToken } = useAuth();
  const [{ wallet }, connect] = useConnectWallet();

  const [transactions, setTransactions] = React.useState<TransactionCard[]>([]);

  const getLinkToken = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL ?? "/api"}/api/plaid/create-link`
    );

    const token = response.data.link_token;
    setLinkToken(token);
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

  React.useEffect(() => {
    getLinkToken();
    getTransactions();
  }, []);

  const config = {
    token: linkToken,
    onSuccess: (publicToken: string) => exchangeToken(publicToken),
  };

  const { open, ready } = usePlaidLink(config);

  const connectBankAccount = () => {
    connect({});
    open();
  };

  /*
    If plaid is in a ready state and the bankaccount has not been connected
    check our server if we have the accesstoken stored in db.
  */
  if (ready && !bankConnected) {
    getAccessToken();
  }

  if (bankConnected && wallet) {
    return (
      <div className="flex flex-col items-center rounded-xl bg-white border border-gat-green shadow-md shadow-black/20 h-[500px] w-full md:w-1/3 md:max-w-[300px] px-5 py-5">
        <h6 className="font-bold text-xl">
          My Green<span className="text-gat-green">Activism</span>
        </h6>
        <div className="flex-1">
          <div className="text-xs text-center">
            <p className="mt-8">
              Your carbon footprint over the past 30 days amounts to:
            </p>
            <div className="flex flex-col items-center justify-center">
              <span className="text-gat-green text-2xl">
                {getEmissionsTotal(transactions)}
              </span>
              <span>kg CO2eq</span>
              <button
                onClick={() => setShow(true)}
                className="my-4 border border-gat-green px-4 py-1 rounded-full font-bold text-xs disabled:text-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                Details
              </button>
            </div>
            <p>
              According to your country commitments in Paris Agreements, your
              individual 30 days carbon footprint target is set to: 700kg CO2eq
            </p>

            <p className="mt-3">
              You are currently above the target, which affects your probability
              of winning the Reward pool. Offset by burning GreenAct tokens to
              increase your chances of winning.
            </p>
            <p>Offset feature not available.</p>
          </div>
        </div>
        <button
          className="border border-gat-green w-full py-1 rounded-full font-bold text-xs disabled:text-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled
        >
          Offset
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-xl bg-white border border-gat-green shadow-md shadow-black/20 h-[500px] w-full md:w-1/3 md:max-w-[300px] px-5 py-5">
      <h6 className="font-bold text-xl">
        My Green<span className="text-gat-green">Activism</span>
      </h6>
      <img src="/activism.png" className="h-[130px] my-4" />
      <div className="flex-1">
        <div className="text-xs text-center">
          <p className="font-bold">This could be your first GreenAction!</p>
          <br />
          <p>
            In order to precisely estimate your carbon footprint and play the
            game to earn, you are invited to connect GreenAct to your bank
            accounts through a secure interface from Plaid, our banking partner
            regulated by the Financial Services Authority.
          </p>

          <p className="mt-3">
            GreenAct will not have access to your banking IDs, only your
            transactions to compute your carbon footprint.
          </p>

          <p className="mt-3">
            Your probability of winning the Reward Pool lottery is affected by
            your carbon footprint.
          </p>
        </div>
      </div>
      <button
        className="border border-gat-green w-full py-1 rounded-full font-bold text-xs disabled:text-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
        onClick={bankConnected ? () => setShow(true) : connectBankAccount}
        disabled={!ready}
      >
        {bankConnected ? "Details" : "Connect Banking Data"}
      </button>
    </div>
  );
};

export default BankAccount;
