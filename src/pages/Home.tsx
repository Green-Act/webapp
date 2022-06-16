import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";

type HomePageCard = {
  title: React.ReactElement;
  image: string;
  content: React.ReactElement | string;
  buttonText: string;
  buttonAction: () => unknown;
};

const Home: React.FC<Record<string, never>> = () => {
  // Get link token, this verifies our account credentials,
  // the user must go through their own authentication process
  const [linkToken, setLinkToken] = useState("");

  const getLinkToken = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/plaid/create-link`
    );
    // setting link token in local storage for now, so we can use
    // in list transactions component.
    // TODO: move into our global app state, once that is setup?
    const token = response.data.link_token;
    localStorage.setItem("link-token", token);
    setLinkToken(token);
  };

  useEffect(() => {
    getLinkToken();
  }, []);

  const config = {
    token: linkToken,
    onSuccess: async (publicToken: string) => {
      // exchange public token for an access token, which will
      // be stored securely on our server.
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/plaid/exchange-token`,
        {
          publicToken,
        }
      );
    },
  };

  const { open, ready } = usePlaidLink(config);

  const connectBankAccount = () => {
    console.log("connecting bank account...");
    open();
  };

  const chooseGreenActivist = () => {
    console.log("Choose green activist");
  };

  const letsGreenAct = () => {
    console.log("Let's greenact");
  };

  const homePageCards: Array<HomePageCard> = [
    {
      title: (
        <h6 className="font-bold text-xl">
          My Green<span className="text-gat-green">Activism</span>
        </h6>
      ),
      image: "",
      content: (
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
      ),
      buttonText: "Connect Bank Account",
      buttonAction: connectBankAccount,
    },
    {
      title: (
        <h6 className="font-bold text-xl">
          My Green<span className="text-gat-green">Activist</span>
        </h6>
      ),
      image: "",
      content: (
        <div className="text-xs text-center">
          <p>Choose your GreenActivist to start playing the game.</p>

          <p className="mt-3">
            Your GreenActivist is unique and belongs only to you. It is the
            online reflection of your real life sustainable actions.
          </p>
          <p className="mt-3">
            You’ll be able to share it on your favorite social networks to show
            your community your involvement in saving our planet
          </p>
        </div>
      ),
      buttonText: "Choose my GreenActivist",
      buttonAction: chooseGreenActivist,
    },
    {
      title: (
        <h6 className="font-bold text-xl">
          My Green<span className="text-gat-green">Actions</span>
        </h6>
      ),
      image: "",
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
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-28">
        {homePageCards.map(
          ({ title, image, content, buttonText, buttonAction }, index) => {
            return (
              <div
                className="flex flex-col items-center justify-between rounded-xl bg-white border border-gat-green shadow-md shadow-black/20 h-[500px] w-full md:w-1/3 md:max-w-[300px] px-12 py-5"
                key={index}
              >
                {title}
                <img src={image} />
                {content}
                <button
                  className="border border-gat-green w-full py-1 rounded-full font-bold text-xs"
                  onClick={buttonAction}
                  disabled={index === 0 && !ready}
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
