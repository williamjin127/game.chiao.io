import React from "react";
import Grid from "@mui/material/Grid";
import { AppBar, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterWrapper = styled(AppBar)({
  position: "static",
  background: "rgb(32, 14, 38)",
  padding: 20,
  textAlign: "center",
  color: "#EDEDED38",
  lineHeight: 2.3,

  h2: {
    margin: 0,
  }
});

const Footer = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="md">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <h2>Disclaimer</h2>
          <div>Copyright Chiaotzu Inu &copy; {new Date().getFullYear()}</div>
        </Grid>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
