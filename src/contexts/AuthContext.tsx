import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";

import { useSnackbar } from "./Snackbar";
import { config } from "../config";
import TokenLogo from "../assets/chiao.png";

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

  const switchNetwork = async (switchChainId) => {
    const chainList = {
      "0x3": "Ropsten Test Network",
      "0x61": "Binance Test Network",
      "0xfa2": "Fantom Test Network",
    };

    if (parseInt(""+chainId) === parseInt(switchChainId)) {
      showSnackbar({
        severity: "warning",
        message: `You are already in ${chainList[switchChainId]}`,
      });
      return;
    }

    try {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: switchChainId }],
      });
    } catch (err: any) {
      if (err.code === 4902) {
        showSnackbar({
          severity: "error",
          message: `Please add ${chainList[switchChainId]} to your Metamask`,
        });
      } else {
        console.error(err);
        showSnackbar({
          severity: "error",
          message: err as string,
        });
      }
    }
  };

  const addToken = async () => {
    if (!chainId) {
      return;
    }
    try {
      const chainIdInt = parseInt("" + chainId);
      let contractAddress;
      if (chainIdInt === 3) {
        contractAddress = config.ERC20ContractAddress.ROPSTEN;
      } else if (chainIdInt === 97) {
        contractAddress = config.BEP20ContractAddress.TESTNET;
      } else if (chainIdInt === 4002) {
        return;
      } else {
        return;
      }
      await web3.currentProvider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: contractAddress,
            symbol: "CHIAO",
            decimals: 18,
            image: TokenLogo,
            // image: "https://game.chiao.io/comingsoon/wp-content/uploads/2021/12/CHIAOFLY-FINAL-3-rect-1000x-150x150.png",
          },
        },
      });
    } catch (err) {
      console.error(err);
      showSnackbar({
        severity: "error",
        message: err as string,
      });
    }
  };

  useEffect(() => {
    connect();
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
        switchNetwork,
        addToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
