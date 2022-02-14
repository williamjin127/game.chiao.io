import React from "react";
import ChiaoFly from "../assets/chiaofly.png";
import { styled } from "@mui/material/styles";

const ChiaoBannerWrapper = styled('div')`
    display: flex;
    justify-content: center;
    width: 100%;
    
    img {
        width: 100%;
        max-width: 500px;
    }
`;

const ChiaoBanner = () => {
    return (
        <ChiaoBannerWrapper>
            <img src={ChiaoFly} width={500} alt="Chiao Fly" />
        </ChiaoBannerWrapper>
    );
};

export default ChiaoBanner;
