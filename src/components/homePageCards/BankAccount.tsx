import React from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const BankAccount: React.FC<Props> = ({ setShow }) => {
  // Get link token, this verifies our account credentials,
  // the user must go through their own authentication process
  const [linkToken, setLinkToken] = React.useState<string>("");
  // bank account connected state
  const [connected, setConnected] = React.useState<boolean>(false);
  // control bank account details popup
  const [display, setDisplay] = React.useState<boolean>(false);

  const getLinkToken = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL ?? "/api"}/api/plaid/create-link`
    );
    // setting link token in local storage for now, so we can use
    // in list transactions component.
    // TODO: move into our global app state, once that is setup?
    const token = response.data.link_token;
    localStorage.setItem("link-token", token);
    setLinkToken(token);
  };

  React.useEffect(() => {
    getLinkToken();
  }, []);

  const config = {
    token: linkToken,
    onSuccess: async (publicToken: string) => {
      // exchange public token for an access token, which will
      // be stored securely on our server.
      const response = await axios.post(
        `${
          process.env.REACT_APP_SERVER_URL ?? "/api"
        }/api/plaid/exchange-token`,
        {
          publicToken,
        }
      );

      const success = 201;
      if (response.status === success) {
        setConnected(true);
      }
    },
  };

  const { open, ready } = usePlaidLink(config);

  const connectBankAccount = () => {
    console.log("connecting bank account...");
    open();
  };

  console.log("ready: ", ready);
  return (
    <div className="flex flex-col items-center rounded-xl bg-white border border-gat-green shadow-md shadow-black/20 h-[500px] w-full md:w-1/3 md:max-w-[300px] px-5 py-5">
      <h6 className="font-bold text-xl">
        My Green<span className="text-gat-green">Activism</span>
      </h6>
      <img src="/activism.png" className="h-[130px] my-4" />
      <div className="flex-1">
        <div className="text-xs text-center">
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
        </div>
      </div>
      <button
        className="border border-gat-green w-full py-1 rounded-full font-bold text-xs disabled:text-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
        onClick={connected ? () => setShow(true) : connectBankAccount}
        disabled={!ready}
      >
        {connected ? "Details" : "Connect Bank Account"}
      </button>
    </div>
  );
};

export default BankAccount;
