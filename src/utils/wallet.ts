import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";

// import UAuth from "@uauth/js";
// import uauthBNCModule from "@uauth/web3-onboard";

// const uauthOptions = {
//   clientID: process.env.REACT_APP_CLIENT_ID!,
//   redirectUri: process.env.REACT_APP_REDIRECT_URI!,
//   scope: process.env.REACT_APP_SCOPE!,
// };

// const uauth = new UAuth(uauthOptions);

// const uauthBNCOptions = {
//   uauth: uauth,
//   walletconnect: {
//     infuraId: process.env.REACT_APP_INFURA_ID!,
//   },
// };

// const uauthModule = uauthBNCModule(uauthBNCOptions);

const injected = injectedModule();

init({
  wallets: [injected],
  chains: [
    {
      id: "0x89",
      token: "MATIC",
      label: "Matic Mainnet",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
  ],
  appMetadata: {
    name: "GreenAct",
    icon: "/logo.svg",
    description: "GreenAct",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
  accountCenter: {
    desktop: {
      position: "topRight",
      enabled: true,
      minimal: true,
    },
    mobile: {
      position: "topRight",
      enabled: true,
      minimal: true,
    },
  },
});
