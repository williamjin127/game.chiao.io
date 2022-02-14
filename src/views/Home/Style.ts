import { styled } from "@mui/material/styles";

export default styled('div')`
    width: 100%;

  .connect-wallet-text {
    line-height: 1;
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
  
  .text-center {
    text-align: center;
  }
  
`;
