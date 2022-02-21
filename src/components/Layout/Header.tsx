import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AppBar, Container } from "@mui/material";

import Logo from "../../assets/chiao64.png";

import { minimizeAddress } from "../../helper/utils";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { address, loading, connect, disconnect } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

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
