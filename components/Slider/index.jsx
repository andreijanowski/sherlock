import { createGlobalStyle } from "styled-components";

export const SliderStyles = createGlobalStyle`
  .bm-burger-button {
    display: none
  }

  .bm-cross-button {
    top: 12px !important;
    right: 12px !important;
    width: 20px !important;
    height: 20px !important;
    border: 2px solid rgba(${p => p.theme.colors.dark}, 0.4);
    border-radius: 100%;
    cursor: pointer;

    > span {
      top: 7px !important;
      right: 13px !important;
    }
  }

  .bm-cross {
    width: 10px !important;
    height: 2px !important;
    background: rgb(${p => p.theme.colors.dark});
    border-radius: 2px;
  }

  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  .bm-menu {
    padding: 32px;
    background: rgb(${p => p.theme.colors.white});
  }

  .bm-item {
    outline: none;
  }

  .bm-item-list {
    height: auto !important;
    min-height: 100% !important;
  }

  .bm-overlay {
    background-color: rgba(${p => p.theme.colors.dark}, 0.16);
  }
`;
