import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faAngleDown,
  faArrowLeft,
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/fontawesome-free-brands";

import fonts from "./fonts";

library.add(faPlay, faAngleDown, faArrowLeft, faCircleNotch, faFacebookF);

export default createGlobalStyle`
    ${styledNormalize}
    ${fonts}

    * {
        box-sizing: border-box;
    }

    body {
        font-family: Inter UI;
        background-color: rgb(${p => p.theme.colors.background});
    }
`;
