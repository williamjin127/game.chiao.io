import React from "react";
import { Button, styled, withStyles } from "@mui/material";

const BigOutlinedButton = styled(Button)(() => ({
    padding: "12px 24px 12px 32px",
    fontSize: 22,
    borderWidth: "2px",
    borderRadius: "4px",
    minWidth: "330px"
}));

export default BigOutlinedButton;
