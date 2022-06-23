import React, { createContext, ReactNode, useContext } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import getTrimmedHash from "../utils/getTrimmedHash";
import { WalletState } from "@web3-onboard/core";

interface AuthContextType {
  account: string;
  loading: boolean;
  error?: string;
  connect: () => unknown;
  wallet: WalletState | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const getAccount = (): string => {
    return wallet
      ? wallet.accounts[0].ens?.name ??
          getTrimmedHash(wallet.accounts[0].address, 6)
      : "";
  };

  const initialState: AuthContextType = {
    wallet,
    account: getAccount(),
    loading: connecting,
    connect,
  };

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
