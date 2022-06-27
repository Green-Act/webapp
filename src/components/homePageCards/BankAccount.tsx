import React from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const BankAccount: React.FC<Props> = ({ setShow }) => {
  // Get link token, this verifies our account credentials,
  // the user must go through their own authentication process
  const [linkToken, setLinkToken] = React.useState<string>("");
  // bank account connected state
  const { bankConnected, getAccessToken, exchangeToken } = useAuth();

  const getLinkToken = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL ?? "/api"}/api/plaid/create-link`
    );

    const token = response.data.link_token;
    setLinkToken(token);
  };

  React.useEffect(() => {
    getLinkToken();
  }, []);

  const config = {
    token: linkToken,
    onSuccess: (publicToken: string) => exchangeToken(publicToken),
  };

  const { open, ready } = usePlaidLink(config);

  const connectBankAccount = () => {
    open();
  };

  /*
    If plaid is in a ready state and the bankaccount has not been connected
    check our server if we have the accesstoken stored in db.
  */
  if (ready && !bankConnected) {
    getAccessToken();
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
