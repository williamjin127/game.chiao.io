import React from "react";
import ChiaoGameScreen from "../assets/CHIAO-Force-Game.jpg";

import { styled } from "@mui/material/styles";

const ChiaoGameWrapper = styled('div')`
    display: flex;
    justify-content: center;
    width: 100%;
    
    img {
        width: 100%;
        max-width: 500px;
    }
`;

const GameStage = () => {
    return (
        <ChiaoGameWrapper>
            <img src={ChiaoGameScreen} width={500} alt="Chiao Game" />
        </ChiaoGameWrapper>
    );
};

export default GameStage;
