import { useEffect, useState } from "react";
import Web3 from "web3";
import { Container, Grid, Link, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useContracts } from "../../contexts/Web3Context";
import { useSnackbar } from "../../contexts/Snackbar";
import useAuth from "../../hooks/useAuth";
import ChiaoBanner from "../../components/ChiaoBanner";
import BigOutlinedButton from "../../components/BigOutlinedButton";
import HomeWrapper from "./Style";
import { formatBalance } from "../../helper/utils";
import ApiService from "../../helper/api";
import SocialButtons from "../../components/SocialButtons";

export default function Home() {
  const {
    address,
    chainId,
    loading,
    connect,
    switchNetwork,
    addToken,
  } = useAuth();
  const {
    contracts: { tokenContract },
    wrongNetwork,
  } = useContracts();
  const { showSnackbar } = useSnackbar();

  const [balance, setBalance] = useState(0);

  const allowAmount = 1000000000;
  const history = useHistory();

  const fetchInfo = async () => {
    if (!tokenContract || !address) {
      setBalance(0);
      return;
    }
    // Temp code
    if (parseInt(chainId) !== 1 && parseInt(chainId) !== 3) {
      setBalance(0);
      return;
    }

    let balanceCHIAO;
    try {
      const balance = await tokenContract.methods.balanceOf(address).call();
      balanceCHIAO = parseInt(Web3.utils.fromWei(`${balance}`, "ether"));
      setBalance(balanceCHIAO);
    } catch (err) {
      console.error(err);
      setBalance(0);
    }
    if (balanceCHIAO >= allowAmount) {
      await ApiService.registerUser(address);
    }
  };

  useEffect(() => {
    if (!address || !chainId) {
      return;
    }
    console.log(address, chainId, wrongNetwork);
    checkConnect();
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

  const goToPlay = () => {
    history.push("/play");
  };

  const handleTokenPurchase = () => {};

  return (
    <HomeWrapper>
      <SocialButtons
          facebook="https://www.facebook.com/ChiaotzuInuToken"
          twitter="https://twitter.com/chiaotoken"
          discord="https://discord.io/CHIAO"
          telegram="https://chiao.io/telegram"
          reddit="https://www.reddit.com/r/chiaotoken/"
          instagram="https://www.instagram.com/chiaotzuinu/"
        />
      <Container maxWidth="lg">
        <Grid container direction="column" justifyContent="center">
          <Grid item pt={3}>
            <ChiaoBanner />
          </Grid>
          <Grid item pt={3}>
            {!address && (
              <Grid container direction="column">
                <Grid item>
                  <Typography
                    fontSize={28}
                    color="#F9F9F5"
                    align="center"
                    className="connect-wallet-text"
                  >
                    To Access Chiao Fly
                    <br />
                    Connect Your Wallet:
                  </Typography>
                </Grid>
                <Grid item mt={2} className="text-center">
                  <BigOutlinedButton
                    disabled={loading}
                    color="#FEAC00"
                    onClick={connect}
                  >
                    Connect Wallet
                  </BigOutlinedButton>
                </Grid>
              </Grid>
            )}

            {address && (
              <Grid container direction="column" justifyContent="center">
                <Grid item pt={3}>
                  <Grid container direction="column" justifyContent="center">
                    <Grid item>
                      <Typography
                        fontSize={28}
                        mt={2}
                        color="#fff"
                        align="center"
                      >
                        Choose Your Network:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        pt={1}
                        spacing={3}
                        justifyContent="space-between"
                      >
                        <Grid
                          item
                          xl={4}
                          lg={4}
                          md={4}
                          sm={12}
                          xs={12}
                          sx={{ textAlign: "center" }}
                        >
                          <BigOutlinedButton
                            color="#FEAC00"
                            onClick={() => switchNetwork("0x1")}
                          >
                            Ethereum
                          </BigOutlinedButton>
                        </Grid>
                        <Grid
                          item
                          xl={4}
                          lg={4}
                          md={4}
                          sm={12}
                          xs={12}
                          sx={{ textAlign: "center" }}
                        >
                          <BigOutlinedButton
                            color="#FEAC00"
                            onClick={() => switchNetwork("0x61")}
                          >
                            Binance Smart Chain
                          </BigOutlinedButton>
                        </Grid>
                        <Grid
                          item
                          xl={4}
                          lg={4}
                          md={4}
                          sm={12}
                          xs={12}
                          sx={{ textAlign: "center" }}
                        >
                          <BigOutlinedButton
                            color="#FEAC00"
                            onClick={() => switchNetwork("0xfa2")}
                          >
                            Fantom Opera
                          </BigOutlinedButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item pt={3}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <BigOutlinedButton color="#6AE707" onClick={addToken}>
                        Add $CHIAO To Metamask
                      </BigOutlinedButton>
                    </Grid>
                    <Grid item>
                      <Typography
                        fontSize={28}
                        mt={2}
                        color="#fff"
                        align="center"
                      >
                        Your $CHIAO balance:{" "}
                        <span
                          className={`chiao-value ${
                            balance >= allowAmount
                              ? "greater-than"
                              : "less-than"
                          }`}
                        >
                          {formatBalance(balance)}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {balance >= allowAmount ? (
                  <Grid item pt={3}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography fontSize={28} color="#fff" mb={2}>
                          Congrats! You have enough $CHIAO to play.
                        </Typography>
                      </Grid>
                      <Grid item>
                        <BigOutlinedButton
                          color="#6AE707"
                          onClick={() => goToPlay()}
                          sx={{
                            fontSize: "28px",
                            color: "#6AE707",
                          }}
                        >
                          Enter Chiao Fly
                        </BigOutlinedButton>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item pt={3}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography fontSize={28} color="#fff" align="center">
                          To play Chiao Fly, you must hold at least 100M $CHIAO
                          Tokens.
                          <br />
                          You can win $CHIAO token for FREE in{" "}
                          <a
                            href="https://chiao.io/wp-content/uploads/2022/01/Disclaimer.txt"
                            className="chiao-purchase-link"
                          >
                            Discord
                          </a>{" "}
                          or just Buy them:
                        </Typography>
                      </Grid>
                      <Grid item mt={2} className="text-center">
                        <BigOutlinedButton
                          color="#6AE707"
                          onClick={() => handleTokenPurchase()}
                          sx={{
                            fontSize: "28px",
                            color: "#6AE707",
                          }}
                        >
                          <Link
                            href="https://app.uniswap.org/#/swap?theme=dark&use=v2&slippage=35.00&exactAmount=500000000000&exactField=output&inputCurrency=ETH&outputCurrency=0xa0ccb6BEb58C9ac68Ba2f24F4CE340992e828b29&chain=mainnet"
                            underline="none"
                          >
                            Buy $CHIAO
                          </Link>{" "}
                        </BigOutlinedButton>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </HomeWrapper>
  );
}
