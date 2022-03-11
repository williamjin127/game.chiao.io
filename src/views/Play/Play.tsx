import { Container, Grid, Typography } from "@mui/material";
import { useContracts } from "../../contexts/Web3Context";
import useAuth from "../../hooks/useAuth";
import { formatBalance } from "../../helper/utils";
import GameStage from "../../components/GameStage";
import SocialButtons from "../../components/SocialButtons";
import PlayWrapper from "./Style";
import { config } from "../../config";

export default function Play() {
  const { address } = useAuth();
  const { balance } = useContracts();

  const hasPermission = () => {
    return balance >= config.ALLOW_AMOUNT;
  };

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
            {hasPermission() ? (
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
