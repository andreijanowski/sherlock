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
  faAngleRight,
  faChevronRight,
  faChair
} from "@fortawesome/free-solid-svg-icons";
import {
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
  faAngleRight,
  faChevronRight,
  faChair
);

export default createGlobalStyle`
    ${styledNormalize}

    * {
        box-sizing: border-box;
    }

    body {
        font-family: Poppins, sans-serif;
        background-color: rgb(${p => p.theme.colors.background});
    }

    button {
      outline: none;
    }

    a {
      color: rgb(${p => p.theme.colors.blue});
      text-decoration: none;
    }

    .svg-inline--fa {
      display: var(--fa-display, inline-block);
      height: 1em;
      overflow: visible;
      vertical-align: -0.125em;
    }
`;
