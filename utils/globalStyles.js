import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";
import fonts from "./fonts";

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
