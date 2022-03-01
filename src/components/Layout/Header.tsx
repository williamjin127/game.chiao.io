import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AppBar, Container, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";

// import Logo from "../../assets/chiao64.png";

import { minimizeAddress } from "../../helper/utils";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { address, loading, connect, disconnect } = useAuth();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    handleClose();
    disconnect();
  };

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  useEffect(() => {
    let currentTab: any = false;

    switch (location.pathname) {
      case "/":
        currentTab = 0;
        break;
      case "/leaderboard":
        currentTab = 1;
        break;
    }
    setPage(currentTab);
  }, [location.pathname, address]);

  function LinkTab(props) {
    return (
      <Tab
        component={Link}
        style={{ padding: "20px 0px", fontSize: "16px" }}
        {...props}
      />
    );
  }

  return (
    <AppBar
      position="fixed"
      style={{ background: "rgba(32, 14, 38, 0.9)", boxShadow: "none" }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          height="76px"
        >
          <Grid item>
            <Grid container alignItems="center">
              {/* <img src={Logo} width={50} alt="Chiao" /> */}
              {address && (
                <Tabs
                  indicatorColor="secondary"
                  value={page}
                  onChange={handleChange}
                  aria-label="headers"
                >
                  <LinkTab label="Home" to="/" />
                  <LinkTab label="Leaderboard" to="/leaderboard" />
                </Tabs>
              )}
            </Grid>
          </Grid>

          <Grid item display={{ lg: "flex" }}>
            {address ? (
              <Grid container alignItems="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClick}
                  style={{ marginLeft: 24 }}
                >
                  {minimizeAddress(address, 4, -4)}
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem
                    onClick={() => {
                      handleDisconnect();
                    }}
                  >
                    Disconnect
                  </MenuItem>
                </Menu>
              </Grid>
            ) : (
              <Button
                disabled={loading}
                variant="outlined"
                color="secondary"
                onClick={connect}
              >
                Connect
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Header;
