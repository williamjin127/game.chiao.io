import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { Button, Container, Grid, Typography } from "@mui/material";

import { AuthContext } from "../contexts/AuthContext";
import { useContracts } from "../contexts/Web3Context";
import { useSnackbar } from "../contexts/Snackbar";
import useAuth from "../hooks/useAuth";
import { config } from "../config";

export default function Home() {
  // const { address, chainId, loading, connect, disconnect } =
  //   useContext(AuthContext);
  const { address, chainId, loading, connect, disconnect, switchNetwork, addToken } =
    useAuth();
  const {
    contracts: { tokenContract },
    wrongNetwork,
  } = useContracts();
  const { showSnackbar } = useSnackbar();

  const [user, setUser] = useState({ address: "", chainId: 0 });
  const [balance, setBalance] = useState(0);

  const allowAmount = 100000000;

  const fetchInfo = async () => {
    if (!tokenContract || !address) {
      setBalance(0);
      return;
    }
    // Temp code
    if (parseInt(chainId) !== 3) {
      setBalance(0);
      return;
    }

    const balance = await tokenContract.methods.balanceOf(address).call();
    const balanceCHIAO = parseInt(Web3.utils.fromWei(`${balance}`, "ether"));
    setBalance(balanceCHIAO);
  };

  useEffect(() => {
    if (!address || !chainId) {
      setUser({ address: "", chainId: 0 });
      return;
    }
    console.log(address, chainId, wrongNetwork);
    checkConnect();
    setUser({ address, chainId: parseInt(chainId) });
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chainId]);

  useEffect(() => {
    if (!tokenContract) {
      return;
    }
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContract]);

  const checkConnect = () => {
    if (!address) {
      showSnackbar({
        severity: "error",
        message: "Please connect your wallet.",
      });
      return false;
    }
    return true;
  };

  return (
    <Container maxWidth="md">
      <Grid container flexDirection="column" justifyContent="center">
        <Grid item pt={3}>
          {address ? (
            <Button variant="outlined" color="secondary" onClick={disconnect}>
              Disconnect
            </Button>
          ) : (
            <Button
              disabled={loading}
              variant="outlined"
              color="secondary"
              onClick={connect}
            >
              Connect Wallet
            </Button>
          )}
        </Grid>
        {address && (
          <>
            <Grid item pt={3}>
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => switchNetwork("0x3")}
                  >
                    Switch to Ethereum Ropsten
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => switchNetwork("0x61")}
                  >
                    Switch to Binance Testnet
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => switchNetwork("0xfa2")}
                  >
                    Switch to Fantom Testnet
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item pt={3}>
              <Button variant="outlined" color="secondary" onClick={addToken}>
                Add CHIAO to Metamask
              </Button>
            </Grid>
          </>
        )}
        {address && balance > allowAmount ? (
          <Grid item pt={3}>
            <Typography fontSize={22} mt={2}>
              Information of your wallet.
            </Typography>
            <Typography fontSize={18} mt={2}>
              Your Address: {address}
            </Typography>
            <Typography fontSize={18} mt={2}>
              Your CHIAO balance: {balance}
            </Typography>
          </Grid>
        ) : (
          <Grid item pt={3}>
            <Typography fontSize={18} mt={2}>
              You need to connect your Metamask and have 100M CHIAO token to see
              content.
            </Typography>
            {address && (
              <Typography fontSize={18} mt={2}>
                Your CHIAO balance: {balance}
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
