import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import ApiService from "../../helper/api";
import { minimizeAddress } from "../../helper/utils";


interface IGameResult {
  WalletAddress: string;
  UserName: string;
  EMail: string;
  PlayerScore: string;
  DragonBalls: string;
  FireballsHit: string;
  ShieldsCollected: string;
  ShieldsUsed: string;
  LostHearts: string;
  TapScreen: string;
  GameplayTime: string;
  GameplaySeconds: string;
  ActiveTimes: string;
  LatestDate: string;
}

export default function Leaderboard() {
  const { address } = useAuth();

  const [gameResults, setGameResults] = useState<IGameResult[]>([]);

  const fetchGameResults = async () => {
    if (!address) {
      setGameResults([]);
      return;
    }
    const gameResults = await ApiService.getGameResults();
    setGameResults(gameResults);
  };

  useEffect(() => {
    fetchGameResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" justifyContent="space-between">
        {!address ? (
          <Typography fontSize={28} mt={2} color="#fff">
            Please connect wallet.
          </Typography>
        ) : (
          <TableContainer>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><Typography fontSize={18}>Address</Typography></TableCell>
                  <TableCell align="center"><Typography fontSize={18}>PlayerScore</Typography></TableCell>
                  <TableCell align="center"><Typography fontSize={18}>DragonBalls</Typography></TableCell>
                  <TableCell align="center"><Typography fontSize={18}>FireballsHit</Typography></TableCell>
                  <TableCell align="center"><Typography fontSize={18}>ShieldsCollected</Typography></TableCell>
                  <TableCell align="center"><Typography fontSize={18}>ShieldsUsed</Typography></TableCell>
                  <TableCell align="center"><Typography fontSize={18}>LostHearts</Typography></TableCell>
                  <TableCell align="center"><Typography fontSize={18}>TapScreen</Typography></TableCell>
                  <TableCell align="center"><Typography fontSize={18}>GameplayTime</Typography></TableCell>
                  <TableCell align="center"><Typography fontSize={18}>GameplaySeconds</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gameResults.map((row) => (
                  <TableRow
                    key={row.WalletAddress}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {minimizeAddress(row.WalletAddress, 6, -4)}
                    </TableCell>
                    <TableCell align="center">{row.PlayerScore}</TableCell>
                    <TableCell align="center">{row.DragonBalls}</TableCell>
                    <TableCell align="center">{row.FireballsHit}</TableCell>
                    <TableCell align="center">{row.ShieldsCollected}</TableCell>
                    <TableCell align="center">{row.ShieldsUsed}</TableCell>
                    <TableCell align="center">{row.LostHearts}</TableCell>
                    <TableCell align="center">{row.TapScreen}</TableCell>
                    <TableCell align="center">{row.GameplayTime}</TableCell>
                    <TableCell align="center">{row.GameplaySeconds}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Container>
  );
}
