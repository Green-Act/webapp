import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  SetStateAction,
} from "react";
import { useConnectWallet } from "@web3-onboard/react";
import getTrimmedHash from "../utils/getTrimmedHash";
import { WalletState } from "@web3-onboard/core";
import axios from "axios";

interface AuthContextType {
  account: string;
  loading: boolean;
  error?: string;
  connect: () => unknown;
  wallet: WalletState | null;
  bankConnected: boolean;
  setBankConnected: React.Dispatch<SetStateAction<boolean>>;
  getAccessToken: () => unknown;
  exchangeToken: (publicToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [bankConnected, setBankConnected] = useState<boolean>(false);

  // store in local storage, sometimes getting null for wallet when it should be loaded.
  if (wallet) {
    localStorage.setItem(
      "green-act-wallet",
      wallet ? wallet.accounts[0].address : ""
    );
  }

  const getAccount = (): string => {
    return wallet
      ? wallet.accounts[0].ens?.name ??
          getTrimmedHash(wallet.accounts[0].address, 6)
      : "";
  };

  const getAccessToken = async () => {
    if (!wallet) {
      return;
    }

    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL ?? "/api"}/api/plaid/user-token/${
        wallet?.accounts[0].address
      }`
    );

    if (response && response.data.success) {
      setBankConnected(true);
    }
  };

  const exchangeToken = async (publicToken: string) => {
    // exchange public token for an access token, which will
    // be stored securely on our server.

    let storedWallet;

    if (!wallet) {
      // try and get address from localstorage
      storedWallet = await localStorage.getItem("green-act-wallet");
      console.log("storedWallet: ", storedWallet);
    }

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL ?? "/api"}/api/plaid/exchange-token`,
      {
        publicToken,
        wallet: wallet ? wallet.accounts[0].address : storedWallet,
      }
    );

    const success = 201;
    if (response.status === success) {
      setBankConnected(true);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  const initialState: AuthContextType = {
    wallet,
    account: getAccount(),
    loading: connecting,
    connect,
    bankConnected,
    setBankConnected,
    getAccessToken,
    exchangeToken,
  };

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
