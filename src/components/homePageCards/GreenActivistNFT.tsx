import React from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { BigNumberish, ethers } from "ethers";
import axios from "axios";

import ABI from "../../utils/NFTABI.json";

const GreenActivistNFT: React.FC<Record<string, never>> = () => {
  const [{ wallet }, connect] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain(
    wallet?.accounts[0]?.address
  );
  const [isMinting, setIsMinting] = React.useState<boolean>(false);
  const [checkingOwnership, setCheckingOwnership] =
    React.useState<boolean>(false);
  const [chainIsSet, setChainIsSet] = React.useState<boolean>(false);
  const [userOwnershipChecked, setUserOwnershipChecked] =
    React.useState<boolean>(false);
  const [userHasNFT, setUserHasNFT] = React.useState<boolean>(false);
  const [metadata, setMetadata] = React.useState<Record<string, any>>();

  const fetchMetadata = async (tokenURI: string) => {
    return await axios
      .get(tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"))
      .then(({ data }) => data);
  };

  const getUserNFT = async (tokenId: string) => {
    if (wallet) {
      const provider = new ethers.providers.Web3Provider(wallet?.provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x39b10aa1588C012B543E931FbE784311175Aa08F",
        ABI,
        signer
      );
      const tokenURI = await contract.tokenURI(parseInt(tokenId));
      const metadata = await fetchMetadata(tokenURI);
      setMetadata(metadata);
      return metadata;
    }
  };

  const checkNFTOwnership = async () => {
    if (wallet) {
      try {
        setCheckingOwnership(true);
        const provider = new ethers.providers.Web3Provider(wallet?.provider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0x39b10aa1588C012B543E931FbE784311175Aa08F",
          ABI,
          signer
        );
        const userBalance = await contract.walletOfOwner(
          wallet.accounts[0].address
        );
        const tokenIds = userBalance.map((balance: BigNumberish) =>
          balance.toString()
        );
        if (tokenIds.length > 0) {
          setUserHasNFT(true);
          await getUserNFT(tokenIds[0]);
        }
        setUserOwnershipChecked(true);
      } catch (error) {
        console.error(error);
      } finally {
        setCheckingOwnership(false);
      }
    }
  };

  React.useEffect(() => {
    if (wallet && !metadata) {
      checkNFTOwnership();
    }
  }, [wallet, metadata]);

  const checkAndSetChain = React.useCallback(async () => {
    console.log("Check chain");
    if (connectedChain?.id !== "0x13881") {
      await setChain({
        chainId: "0x13881",
      });
      console.log("Connected to Polygon Mumbai");
      setChainIsSet(true);
    }
  }, [connectedChain, setChain]);

  React.useEffect(() => {
    if (isMinting && wallet) {
      checkAndSetChain();
    }
  }, [isMinting, wallet]);

  const mintNFT = React.useCallback(async () => {
    if (wallet) {
      try {
        const provider = new ethers.providers.Web3Provider(wallet?.provider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0x39b10aa1588C012B543E931FbE784311175Aa08F",
          ABI,
          signer
        );
        const txn = await contract.mint(1);
        await txn.wait();
      } catch (error) {
        console.error(error);
      } finally {
        setIsMinting(false);
        checkNFTOwnership();
      }
    }
    console.log("wallet not connected");
  }, [wallet]);

  React.useEffect(() => {
    if (isMinting && chainIsSet) {
      checkNFTOwnership();
    }
  }, [isMinting, chainIsSet]);

  React.useEffect(() => {
    if (isMinting && chainIsSet && userOwnershipChecked && !userHasNFT) {
      mintNFT();
    }
  }, [isMinting, chainIsSet, userOwnershipChecked, !userHasNFT]);

  const mintGreenActivist = async () => {
    try {
      setIsMinting(true);
      if (!wallet) {
        await connect({});
      }
      console.log("wallet connected");
    } catch (error) {
      console.error(error);
      setIsMinting(false);
    }
  };

  return (
    <div className="flex flex-col items-center rounded-xl bg-white border border-gat-green shadow-md shadow-black/20 h-[500px] w-full md:w-1/3 md:max-w-[300px] px-12 py-5">
      <h6 className="font-bold text-xl">
        My Green<span className="text-gat-green">Activist</span>
      </h6>
      <div
        className={`relative my-4 ${
          userHasNFT ? "h-[200px]" : "h-[130px]"
        } flex items-center justify-center`}
      >
        <img
          src={
            metadata
              ? metadata.image.replace(
                  "ipfs://",
                  "https://gateway.pinata.cloud/ipfs/"
                )
              : userHasNFT
              ? null
              : "/activist.png"
          }
          className="h-full"
        />
        {checkingOwnership ||
          (userHasNFT && !metadata && (
            <div className="absolute m-auto z-10 animate-spin h-10 w-10 border-l-4 border-white rounded-full"></div>
          ))}
      </div>
      <div className="flex-1">
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
      </div>
      {!userHasNFT && (
        <button
          className="border border-gat-green w-full py-1 rounded-full font-bold text-xs"
          onClick={mintGreenActivist}
        >
          {isMinting ? "Minting..." : "Mint my GreenActivist"}
        </button>
      )}
    </div>
  );
};

export default GreenActivistNFT;
