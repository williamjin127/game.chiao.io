import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

import tokenABI from "../contracts/abis/CHIAOToken.json";

import { config } from "../config";
import useAuth from "../hooks/useAuth";
import { useSnackbar } from "./Snackbar";

interface Contracts {
  tokenContract?: Contract;
}
interface Web3ContextValue {
  web3?: Web3;
  contracts: Contracts;
  wrongNetwork: boolean;
}

export const Web3Context = createContext<Web3ContextValue>({
  wrongNetwork: false,
  contracts: {},
});

export const Web3Provider = ({ children }: PropsWithChildren<any>) => {
  const { web3, chainId } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [wrongNetwork, setWrongNetwork] = useState(false);

  const [contracts, setContracts] = useState<Contracts>({});

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const chainIdInt = parseInt(chainId);
    if (chainIdInt !== 1 && chainIdInt !== 3 && chainIdInt !== 97 && chainIdInt !== 4002) {
      showSnackbar({
        severity: "error",
        message: "Wrong network",
      });
      setWrongNetwork(true);
      return;
    }
    setWrongNetwork(false);

    const contractAddress = config.ERC20ContractAddress.MAINNET;
    const tokenContract = new web3.eth.Contract(
      tokenABI as any,
      contractAddress
    );

    setContracts({
      tokenContract,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return (
    <Web3Context.Provider value={{ web3, contracts, wrongNetwork }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useContracts = () => useContext(Web3Context);
