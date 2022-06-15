import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import UAuth from "@uauth/js";
import uauthBNCModule from "@uauth/web3-onboard";

const uauthOptions = {
  clientID: process.env.REACT_APP_CLIENT_ID!,
  redirectUri: process.env.REACT_APP_REDIRECT_URI!,
  fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER!,
  scope: "openid wallet",
};

const uauth = new UAuth(uauthOptions);

const uauthBNCOptions = {
  uauth: uauth,
  walletconnect: {
    infuraId: process.env.REACT_APP_INFURA_ID!,
  },
};

const uauthModule = uauthBNCModule(uauthBNCOptions);

let isInitialized = false;
const injected = injectedModule();
export function initialize() {
  if (isInitialized) {
    return;
  }
  isInitialized = true;

  init({
    wallets: [injected, uauthModule],
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
        enabled: false,
        minimal: false,
      },
      mobile: {
        position: "topRight",
        enabled: false,
        minimal: true,
      },
    },
  });
}
