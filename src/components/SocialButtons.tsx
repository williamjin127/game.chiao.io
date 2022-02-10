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
    width: 35,
    height: 35,
    borderRadius: 4,
    color
}));

const SocialButtons = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton href="" color="#3B5998">
                <FontAwesomeIcon icon={faFacebookF} />
            </IconButton>
            <IconButton href="" color="#1DA1F2">
                <FontAwesomeIcon icon={faTwitter} />
            </IconButton>
            <IconButton href="" color="#5865F2">
                <FontAwesomeIcon icon={faDiscord} />
            </IconButton>
            <IconButton href="" color="#23A9EB">
                <FontAwesomeIcon icon={faTelegramPlane} />
            </IconButton>
            <IconButton href="" color="#FF4300">
                <FontAwesomeIcon icon={faRedditAlien} />
            </IconButton>
            <IconButton href="" color="#FF4300">
                <FontAwesomeIcon icon={faInstagram} />
            </IconButton>
        </Box>
    );
};

export default SocialButtons;
