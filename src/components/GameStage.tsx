import React from "react";
import { Box } from "@mui/material";
import ChiaoGameScreen from "../assets/CHIAO-Force-Game.jpg";

const GameStage = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <img src={ChiaoGameScreen} width={500} alt="Chiao Game" />
        </Box>
    );
};

export default GameStage;
