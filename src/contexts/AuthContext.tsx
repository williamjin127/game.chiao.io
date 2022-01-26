import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";

import { useSnackbar } from "./Snackbar";
import { config } from "../config";

export const AuthContext = createContext<any>({
  address: null,
  chainId: null,
  loading: false,
  connect: () => null,
  disconnect: () => null,
  switchChain: () => null,
});

let web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {},
});


export const AuthProvider = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [web3, setWeb3] = useState<any>(null);
  const { showSnackbar } = useSnackbar();

  const subscribeProvider = (provider) => {
    provider.on("disconnect", (error) => {
      showSnackbar({
        severity: "info",
        message: "Account Disconnected",
      });
    });
    provider.on("accountsChanged", (accounts) => {
      setAddress(accounts[0]);
      showSnackbar({
        severity: "info",
        message: "Account Changed",
      });
    });
    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      setChainId(chainId);
      showSnackbar({
        severity: "info",
        message: "Network Changed",
      });
    });
  };

  const connect = async () => {
    if (address) {
      return;
    }
    setLoading(true);

    try {
      let web3 = new Web3(Web3.givenProvider);

      if (!web3.currentProvider) {
        showSnackbar({
          severity: "error",
          message: "Please install MetaMask!",
        });
        return;
      }
      const provider = await web3Modal.connect();
      subscribeProvider(provider);
      web3 = new Web3(provider);
      setWeb3(web3);

      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      // const chain = await window.ethereum.request({method: 'eth_chainId'});
      const accounts = await web3.eth.getAccounts();
      const chain = await web3.eth.getChainId();
      setAddress(accounts[0]);
      setChainId(chain);
    } catch (err) {
      web3Modal.clearCachedProvider();
      console.error(err);
      showSnackbar({
        severity: "error",
        message: "Failed to connect",
      });
    }
    setLoading(false);
  };

  const disconnect = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    web3Modal.clearCachedProvider();
    setChainId(null);
    setAddress(null);
  };

  useEffect(() => {
    // connect();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        web3,
        address,
        chainId,
        loading,
        connect,
        disconnect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
