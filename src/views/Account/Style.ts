import { styled } from "@mui/material/styles";

export default styled("div")(({ theme }) => `
    .chiao-value {
        font-weight: 500;
        color: lime;
    }
    .copy-text {
        font-size: 15px;
        color: rgb(255, 61, 87);
    }
    .wrapper {
        position: relative
    }    
    .buttonProgress {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -12px;
        margin-left: -12px;
        color: #08ad6c;
    }    
    .hidden {
        display: none;
    }
`)
