import { useEffect, useState } from "react";
import Web3 from "web3";
import { Container, Grid, Typography } from "@mui/material";
import { useContracts } from "../../contexts/Web3Context";
import useAuth from "../../hooks/useAuth";
import { formatBalance } from "../../helper/utils";
import GameStage from "../../components/GameStage";
import SocialButtons from "../../components/SocialButtons";
import PlayWrapper from "./Style";

const AllowAmount = 100000000;

export default function Play() {
  const { address, chainId } = useAuth();
  const {
    contracts: { tokenContract },
  } = useContracts();
  const [balance, setBalance] = useState(0);

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

    const balance = await tokenContract.methods.balanceOf(address).call();
    const balanceCHIAO = parseInt(Web3.utils.fromWei(`${balance}`, "ether"));
    setBalance(balanceCHIAO);
  };

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chainId, tokenContract]);

  return (
    <PlayWrapper>
      <SocialButtons
          facebook="https://www.facebook.com/ChiaotzuInuToken"
          twitter="https://twitter.com/chiaotoken"
          discord="https://discord.io/CHIAO"
          telegram="https://chiao.io/telegram"
          reddit="https://www.reddit.com/r/chiaotoken/"
          instagram="https://www.instagram.com/chiaotzuinu/"
        />
      <Container maxWidth="xl">
        <Grid
          container
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item pt={3}>
            {balance >= AllowAmount ? (
              <GameStage address={address} />
            ) : address ? (
              <Typography fontSize={28} mt={2} color="#fff">
                You don't have enough $CHIAO balance.
              </Typography>
            ) : (
              <Typography fontSize={28} mt={2} color="#fff">
                You have to connect wallet.
              </Typography>
            )}
          </Grid>
          <Grid item pt={3}>
            <Typography fontSize={28} mt={2} color="#fff">
              Your $CHIAO Balance:{" "}
              <span className="chiao-value">
                {formatBalance(balance)} (ETH)
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </PlayWrapper>
  );
}
