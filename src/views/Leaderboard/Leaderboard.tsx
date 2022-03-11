import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  CircularProgress,
  Box,
  Tabs,
  Tab,
  Avatar,
  CardHeader,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

import useAuth from "../../hooks/useAuth";
import ApiService from "../../helper/api";
import { minimizeAddress, sameAddress } from "../../helper/utils";
import { visuallyHidden } from "@mui/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IGameResult {
  ranking: number;
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
  avatar: string;
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
  color: "#FEAC00",
  "&.MuiInputBase-root": {
    width: "100%",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

const StyledTableRow = styled(TableRow)((props) => ({
  "& .MuiTableCell-root": {
    color: props.color || "white",
    fontSize: 18,
  },
  "& .MuiTypography-root": {
    fontSize: 18,
  },
}));

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  "&:hover, &.Mui-active": {
    color: "#ffffff",
    ".MuiTableSortLabel-icon": {
      color: "#ffffff",
    },
  },
}));

declare type AlignType = "left" | "center" | "right";
declare type DirectionType = "desc" | "asc";

const HeadCells = [
  {
    key: "PlayerScore",
    label: "PlayerScore",
    align: "center" as AlignType,
  },
  {
    key: "DragonBalls",
    label: "DragonBalls",
    align: "center" as AlignType,
  },
  {
    key: "FireballsHit",
    label: "FireballsHit",
    align: "center" as AlignType,
  },
  {
    key: "ShieldsCollected",
    label: "ShieldsCollected",
    align: "center" as AlignType,
  },
  {
    key: "ShieldsUsed",
    label: "ShieldsUsed",
    align: "center" as AlignType,
  },
  {
    key: "LostHearts",
    label: "LostHearts",
    align: "center" as AlignType,
  },
  {
    key: "TapScreen",
    label: "TapScreen",
    align: "center" as AlignType,
  },
  {
    key: "GameplayTime",
    label: "GameplayTime",
    align: "center" as AlignType,
  },
  {
    key: "GameplaySeconds",
    label: "GameplaySeconds",
    align: "center" as AlignType,
  },
];

export default function Leaderboard() {
  const { address } = useAuth();

  const [gameResults, setGameResults] = useState<IGameResult[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("PlayerScore");
  const [sortDirection, setSortDirection] = useState<DirectionType>("desc");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [term, setTerm] = useState("");
  const [tab, setTab] = useState("ath");
  const [tabLoading, setTabLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [sortLoading, setSortLoading] = useState(false);

  const fetchGameResults = async (setLoading) => {
    setLoading(true);
    try {
      if (tab === "ath") {
        await fetchATHResults();
      } else {
        await fetchCompetitionResults();
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchATHResults = async (page = 1, refresh = true) => {
    if (!address) {
      setGameResults([]);
      return;
    }

    try {
      const { results: newResults, next } = await ApiService.getATHResults(
        page,
        {
          sort: sortBy,
          sortdirection: sortDirection,
        }
      );
      if (refresh) {
        setGameResults(newResults);
      } else {
        const loadedResults = [...gameResults, ...newResults];
        setGameResults(loadedResults);
      }

      setPage(page);
      setHasNextPage(next !== null);
    } catch (err) {
      console.log(err);
    }
  };

  const updateATHTableByAddress = async (address) => {
    const { results } = await ApiService.findATHByAddress(address, {
      sort: sortBy,
      sortdirection: sortDirection,
    });
    setGameResults(results);
    if (address) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  };

  const fetchCompetitionResults = async (page = 1, refresh = true) => {
    if (!address) {
      setGameResults([]);
      return;
    }

    try {
      const { results: newResults, next } =
        await ApiService.getCompetitionResults(page, {
          sort: sortBy,
          sortdirection: sortDirection,
        });
      if (refresh) {
        setGameResults(newResults);
      } else {
        const loadedResults = [...gameResults, ...newResults];
        setGameResults(loadedResults);
      }

      setPage(page);
      if (next === null) {
        setHasNextPage(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateCompetitionTableByAddress = async (address) => {
    const { results } = await ApiService.findCompetitionByAddress(address, {
      sort: sortBy,
      sortdirection: sortDirection,
    });
    setGameResults(results);
    if (address) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  };

  const handleSearchKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }

    setTabLoading(true);
    try {
      if (tab === "ath") {
        await updateATHTableByAddress(term);
      } else {
        await updateCompetitionTableByAddress(term);
      }
    } catch (e) {
      console.error(e);
    }
    setTabLoading(false);
  };

  const handleResultSort = (field) => (event) => {
    const isDesc = sortBy === field && sortDirection === "desc";
    setSortDirection(isDesc ? "asc" : "desc");
    setSortBy(field);
  };

  const loadMoreResults = async () => {
    setLoadMoreLoading(true);
    try {
      const nextPage = page + 1;
      if (tab === "ath") {
        await fetchATHResults(nextPage, false);
      } else {
        await fetchCompetitionResults(nextPage, false);
      }
    } catch (e) {
      console.error(e);
    }
    setLoadMoreLoading(false);
  };

  const renderRankingMedal = (ranking) => {
    if (sortDirection === "asc") {
      return ranking;
    }

    switch (ranking) {
      case 1:
        return <FontAwesomeIcon icon={faMedal} color="#AF9500" size="2x" />;
      case 2:
        return <FontAwesomeIcon icon={faMedal} color="#D7D7D7" size="2x" />;
      case 3:
        return <FontAwesomeIcon icon={faMedal} color="#6A3805" size="2x" />;
      default:
        if (ranking <= 7) {
          return <Typography color="lightgreen">{ranking}</Typography>;
        } else {
          return ranking;
        }
    }
  };

  const rowColor = (row) => {
    if (sameAddress(term, row.WalletAddress)) {
      return "#FEAC00";
    }

    if (sortDirection === "asc") {
      return "white";
    }

    let color = "white";
    switch (row.ranking) {
      case 1:
        color = "#AF9500";
        break;
      case 2:
        color = "#D7D7D7";
        break;
      case 3:
        color = "#6A3805";
        break;
      default:
        if (row.ranking <= 7) {
          color = "lightgreen";
        }
        break;
    }

    return color;
  };

  const handleLeaderboardChange = (e, value) => {
    setTab(value);
  };

  useEffect(() => {
    fetchGameResults((value) => setTabLoading(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, tab]);

  useEffect(() => {
    fetchGameResults((value) => setSortLoading(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, sortBy, sortDirection]);

  return (
    <Container>
      {!address ? (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container direction="column">
          <Grid item mb={2}>
            <Tabs value={tab} onChange={handleLeaderboardChange}>
              <Tab label="ATH" value="ath" />
              <Tab label="Competition" value="competition" />
            </Tabs>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Grid container direction="column">
              <Grid item display={{ sm: "flex" }} mb={2}>
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
              {tabLoading ? (
                <CircularProgress />
              ) : (
                <Grid item sx={{ width: "100%" }}>
                  <TableContainer
                    sx={{ borderRadius: "5px", position: "relative" }}
                  >
                    {sortLoading && (
                      <Box
                        sx={{
                          position: "absolute",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: "60px",
                          background: "rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <CircularProgress sx={{ color: "#FEAC00" }} size={25} />
                      </Box>
                    )}
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <Typography fontSize={18}>Rank</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography fontSize={18}>Player</Typography>
                          </TableCell>
                          {HeadCells.map((headCell) => (
                            <TableCell
                              key={headCell.key}
                              align={headCell.align}
                              sortDirection={
                                sortBy === headCell.key ? sortDirection : false
                              }
                            >
                              <StyledTableSortLabel
                                active={sortBy === headCell.key}
                                direction={
                                  sortBy === headCell.key
                                    ? sortDirection
                                    : "desc"
                                }
                                onClick={handleResultSort(headCell.key)}
                              >
                                <Typography fontSize={18}>
                                  {headCell.label}
                                </Typography>
                                {sortBy === headCell.key ? (
                                  <Box component="span" sx={visuallyHidden}>
                                    {sortDirection === "desc"
                                      ? "sorted descending"
                                      : "sorted ascending"}
                                  </Box>
                                ) : null}
                              </StyledTableSortLabel>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {!tabLoading && gameResults.length === 0 && (
                          <TableRow key="nodata">
                            <TableCell align="center" colSpan={9}>
                              No Data
                            </TableCell>
                          </TableRow>
                        )}
                        {gameResults.map((row) => (
                          <StyledTableRow
                            key={row.WalletAddress}
                            color={rowColor(row)}
                            sx={
                              sameAddress(term, row.WalletAddress)
                                ? { border: "2px solid #FEAC00" }
                                : {}
                            }
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {renderRankingMedal(row.ranking)}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    src={row.avatar}
                                    alt={
                                      row.UserName ||
                                      minimizeAddress(row.WalletAddress, 6, -4)
                                    }
                                  />
                                }
                                title={
                                  row.UserName ||
                                  minimizeAddress(row.WalletAddress, 6, -4)
                                }
                                sx={{ padding: 0 }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {row.PlayerScore}
                            </TableCell>
                            <TableCell align="center">
                              {row.DragonBalls}
                            </TableCell>
                            <TableCell align="center">
                              {row.FireballsHit}
                            </TableCell>
                            <TableCell align="center">
                              {row.ShieldsCollected}
                            </TableCell>
                            <TableCell align="center">
                              {row.ShieldsUsed}
                            </TableCell>
                            <TableCell align="center">
                              {row.LostHearts}
                            </TableCell>
                            <TableCell align="center">
                              {row.TapScreen}
                            </TableCell>
                            <TableCell align="center">
                              {row.GameplayTime}
                            </TableCell>
                            <TableCell align="center">
                              {row.GameplaySeconds}
                            </TableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {hasNextPage && (
                    <Grid item mt={2} sx={{ textAlign: "center" }}>
                      <Button
                        onClick={loadMoreResults}
                        variant="contained"
                        color="warning"
                        endIcon={
                          loadMoreLoading ? (
                            <CircularProgress size={18} />
                          ) : null
                        }
                      >
                        Load more
                      </Button>
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
