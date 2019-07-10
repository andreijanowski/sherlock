import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";
import {
  faPlay,
  faAngleDown,
  faPlus,
  faMinus,
  faCheck,
  faTimes,
  faArrowLeft,
  faCircleNotch,
  faFileAlt,
  faPen,
  faCreditCard,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faEye,
  faLock,
  faHourglassStart,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faCcAmex,
  faCcDinersClub,
  faCcDiscover,
  faCcJcb,
  faCcMastercard,
  faCcVisa
} from "@fortawesome/fontawesome-free-brands";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(
  faPlay,
  faAngleDown,
  faPlus,
  faMinus,
  faCheck,
  faTimes,
  faArrowLeft,
  faCircleNotch,
  faFacebookF,
  faFileAlt,
  faPen,
  faCreditCard,
  faCcAmex,
  faCcDinersClub,
  faCcDiscover,
  faCcJcb,
  faCcMastercard,
  faCcVisa,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faEye,
  faLock,
  faHourglassStart,
  faAngleLeft,
  faAngleRight
);

export default createGlobalStyle`
    ${styledNormalize}

    * {
        box-sizing: border-box;
    }

    body {
        font-family: Inter UI, sans-serif;
        background-color: rgb(${p => p.theme.colors.background});
    }

    button {
      outline: none;
    }

    a {
      color: rgb(${p => p.theme.colors.blue});
      text-decoration: none;
    }
`;
