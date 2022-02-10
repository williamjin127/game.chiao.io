import { styled } from "@mui/material/styles";

export default styled('div')`
  .connect-wallet-text {
    font-size: 28px;
    font-weight: 500;
    color: #F9F9F5;
    line-height: 1;
    margin-bottom: 15px;
  }  
  .chiao-value {
    font-weight: 500;
    
    &.less-than {
      color: red;
    }
    &.greater-than {
      color: lime;
    }
  }
  
  .chiao-purchase-link {
    color: aqua;    
    transition-duration: 0.25s;
    &:hover {
      color: purple;
    }
  }
`;
