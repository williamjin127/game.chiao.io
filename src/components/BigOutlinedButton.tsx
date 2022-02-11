import React from "react";
import { ButtonBase, styled } from "@mui/material";

const BigOutlinedButton = styled(ButtonBase)(({color, ...rest}) => (`
    padding: 12px 24px 12px 32px;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: -0.8px;
    text-shadow: 1px 1px 1px rgb(0 0 0 / 64%);
    border: 2px solid ${color};
    border-radius: 4px;
    box-shadow: 0px 0px 10px -5px #9be05e;
    transition: all .4s ease-in;
    background-color: #00000000;
    color: #FBF3F3;
    max-width: 300px;
    width: 100%;
    
    &:hover {
        background-color: ${color};
    }
`));

export default BigOutlinedButton;
