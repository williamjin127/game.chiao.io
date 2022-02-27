import { styled } from "@mui/material/styles";

import useWindowDimensions from "../hooks/useWindowDimensions";

const ChiaoGameWrapper = styled("div")`
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 600px;
  height: 0;
  padding-bottom: 125%;

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;

const GameStage = ({address}) => {
  const { height, width } = useWindowDimensions();

  return (
    <ChiaoGameWrapper
      sx={{ width: width > 1280 ? (height > 800 ? 600 : 400) : "90vw" }}
    >
      <iframe title="ChiaoFly" src={"https://play.chiao.io/?wallet="+address?.toLowerCase()}></iframe>
    </ChiaoGameWrapper>
  );
};

export default GameStage;
