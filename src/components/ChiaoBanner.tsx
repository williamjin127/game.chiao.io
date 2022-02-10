import React from "react";
import { Box } from "@mui/material";
import ChiaoFly from "../assets/chiaofly.png";

const ChiaoBanner = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <img src={ChiaoFly} width={500} alt="Chiao Fly" />
        </Box>
    );
};

export default ChiaoBanner;
