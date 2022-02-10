import SignikaTTF from "../assets/fonts/Signika-Regular.ttf";
import SignikaBoldTTF from "../assets/fonts/Signika-Bold.ttf";
import SignikaSemiBoldTTF from "../assets/fonts/Signika-SemiBold.ttf";
import SignikaMediumTTF from "../assets/fonts/Signika-Medium.ttf";

import ChangaTTF from "../assets/fonts/Changa-Regular.ttf";
import ChangaBoldTTF from "../assets/fonts/Changa-Bold.ttf";
import ChangaSemiBoldTTF from "../assets/fonts/Changa-SemiBold.ttf";
import ChangaExtraBoldTTF from "../assets/fonts/Changa-ExtraBold.ttf";
import ChangaMediumTTF from "../assets/fonts/Changa-Medium.ttf";
import ChangaLightTTF from "../assets/fonts/Changa-Light.ttf";
import ChangaExtraLightTTF from "../assets/fonts/Changa-ExtraLight.ttf";

const Signika = `
  @font-face: {
    font-family: Signika;
    font-weight: 400;
    src: local('Signika-Regular'), url('${SignikaTTF}') format('truetype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face: {
    font-family: Signika;
    font-weight: 500;
    src: local('Signika-Medium'),
      url(${SignikaMediumTTF}) format('truetype');
    unicode-range:
      U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face: {
    font-family: Signika;
    font-weight: 600;
    src: local('Signika-SemiBold'),
      url(${SignikaSemiBoldTTF}) format('truetype');
    unicode-range:
      U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face: {
    font-family: Signika;
    font-weight: 700;
    src: local('Signika-Bold'),
      url(${SignikaBoldTTF}) format('truetype');
    unicode-range:
      U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
}`;

export { Signika };
