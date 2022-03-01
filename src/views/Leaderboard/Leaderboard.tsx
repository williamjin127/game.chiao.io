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
  CircularProgress,
  Box,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import useInfiniteScroll from "react-infinite-scroll-hook";

import useAuth from "../../hooks/useAuth";
import ApiService from "../../helper/api";
import { minimizeAddress, sameAddress } from "../../helper/utils";
import { useSnackbar } from "../../contexts/Snackbar";

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export default function Leaderboard() {
  const { address } = useAuth();

  const [gameResults, setGameResults] = useState<IGameResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [term, setTerm] = useState("");

  const fetchGameResults = async (page = 1, refresh = true) => {
    if (!address) {
      setGameResults([]);
      return;
    }
    setLoading(true);
    try {
      const { results: newResults, next } = await ApiService.getGameResults(
        page
      );
      if (refresh) {
        setGameResults(newResults);
      } else {
        const loadedResults = [...gameResults, ...newResults];
        if (next === null) {
          setHasNextPage(false);
        }
        setGameResults(loadedResults);
      }
      setPage(page);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const updateTableByAddress = async (address) => {
    const { results } = await ApiService.findByAddress(address);
    setGameResults(results);
    setHasNextPage(false);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }

    // if (Web3.utils.isAddress(term)) {
    updateTableByAddress(term);
    // } else {
    //   showSnackbar({ severity: "error", message: "Invalid Address" });
    // }
  };

  const loadMoreNft = () => {
    const nextPage = page + 1;
    fetchGameResults(nextPage, false);
  };

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMoreNft,
  });

  useEffect(() => {
    fetchGameResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Container>
      {!address ? (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container direction="column" justifyContent="space-between">
          <Grid item display={{ lg: "flex" }} mb={2}>
            <Search style={{ borderRadius: 24 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search by address…"
                inputProps={{ "aria-label": "search" }}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
            </Search>
          </Grid>
          <Grid item display={{ lg: "flex" }} sx={{ width: "100%" }}>
            <TableContainer>
              <Table sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography fontSize={18}>Address</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={18}>PlayerScore</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={18}>DragonBalls</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={18}>FireballsHit</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={18}>ShieldsCollected</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={18}>ShieldsUsed</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={18}>LostHearts</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={18}>TapScreen</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={18}>GameplayTime</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={18}>GameplaySeconds</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading && gameResults.length === 0 && (
                    <TableRow key="nodata">
                      <TableCell align="center" colSpan={9}>No Data</TableCell>
                    </TableRow>
                  )}
                  {gameResults.map((row) => (
                    <TableRow
                      key={row.WalletAddress}
                      // sx={{ "&:last-child td, &:last-child th": { border: 0 }, border: "2px solid" }}
                      sx={
                        sameAddress(term, row.WalletAddress)
                          ? { border: "2px solid #FEAC00" }
                          : {}
                      }
                    >
                      <TableCell component="th" scope="row" align="center">
                        {minimizeAddress(row.WalletAddress, 6, -4)}
                      </TableCell>
                      <TableCell align="center">{row.PlayerScore}</TableCell>
                      <TableCell align="center">{row.DragonBalls}</TableCell>
                      <TableCell align="center">{row.FireballsHit}</TableCell>
                      <TableCell align="center">
                        {row.ShieldsCollected}
                      </TableCell>
                      <TableCell align="center">{row.ShieldsUsed}</TableCell>
                      <TableCell align="center">{row.LostHearts}</TableCell>
                      <TableCell align="center">{row.TapScreen}</TableCell>
                      <TableCell align="center">{row.GameplayTime}</TableCell>
                      <TableCell align="center">
                        {row.GameplaySeconds}
                      </TableCell>
                    </TableRow>
                  ))}
                  {hasNextPage && (
                    <TableRow
                      key="loading"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      ref={infiniteRef}
                    >
                      <TableCell colSpan={9}>
                        <Box sx={{ width: "100vw" }}>
                        <Grid container justifyContent="center" alignItems="center">
                          {loading && <CircularProgress />}
                        </Grid>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
