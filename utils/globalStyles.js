import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";
import {
  faPlay,
  faAngleDown,
  faPlus,
  faMinus,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import fonts from "./fonts";

library.add(faPlay, faAngleDown, faPlus, faMinus, faCheck, faTimes);

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
