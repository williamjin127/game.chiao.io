import React from "react";
import {Box, styled} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faDiscord, faTelegramPlane, faRedditAlien, faInstagram } from "@fortawesome/free-brands-svg-icons";

const IconButton = styled("a")(({color}) => ({
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    background: "#fff",
    margin: "0 5px",
    width: '35px',
    height: '35px',
    borderRadius: 4,
    color,
    '--ha-tfx-translate-x-hover': 0,
    '--ha-tfx-translate-y-hover': '-5px',
    '&:hover': {
        transform: "translate(var(--ha-tfx-translate-x-hover, var(--ha-tfx-translate-x, 0)),var(--ha-tfx-translate-y-hover, var(--ha-tfx-translate-y, 0))) scale(var(--ha-tfx-scale-x-hover, var(--ha-tfx-scale-x, 1)),var(--ha-tfx-scale-y-hover, var(--ha-tfx-scale-y, 1))) skew(var(--ha-tfx-skew-x-hover, var(--ha-tfx-skew-x, 0)),var(--ha-tfx-skew-y-hover, var(--ha-tfx-skew-y, 0))) rotateX(var(--ha-tfx-rotate-x-hover, var(--ha-tfx-rotate-x, 0))) rotateY(var(--ha-tfx-rotate-y-hover, var(--ha-tfx-rotate-y, 0))) rotateZ(var(--ha-tfx-rotate-z-hover, var(--ha-tfx-rotate-z, 0)))"
    }
}));

const SocialButtons = ({facebook, twitter, discord, telegram, reddit, instagram}) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton href={facebook} color="#3B5998">
                <FontAwesomeIcon icon={faFacebookF} />
            </IconButton>
            <IconButton href={twitter} color="#1DA1F2">
                <FontAwesomeIcon icon={faTwitter} />
            </IconButton>
            <IconButton href={discord} color="#5865F2">
                <FontAwesomeIcon icon={faDiscord} />
            </IconButton>
            <IconButton href={telegram} color="#23A9EB">
                <FontAwesomeIcon icon={faTelegramPlane} />
            </IconButton>
            <IconButton href={reddit} color="#FF4300">
                <FontAwesomeIcon icon={faRedditAlien} />
            </IconButton>
            <IconButton href={instagram} color="#FF4300">
                <FontAwesomeIcon icon={faInstagram} />
            </IconButton>
        </Box>
    );
};

export default SocialButtons;
