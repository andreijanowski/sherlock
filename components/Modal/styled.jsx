import { createGlobalStyle } from "styled-components";

export const ModalStyles = createGlobalStyle`
  .modal-overlay {
    background-color: rgba(${p => p.theme.colors.dark}, 0.16);
    padding: 32px;
  }

  .modal-modal {
    border-radius: ${p => p.theme.radius.default};
    padding: 32px;
    max-width: calc(100vw - 64px);
  }

  .modal-closeButton {
    border: 2px solid rgba(${p => p.theme.colors.dark}, 0.4);
    border-radius: 100%;
    width: 20px;
    height: 20px;
    top: 12px;
    right: 12px;
    cursor: pointer;

    path {
        stroke: rgb(${p => p.theme.colors.dark});
        fill: rgb(${p => p.theme.colors.dark});
    }

    &:hover {
        background-color: rgb(${p => p.theme.colors.dark});
        border: 2px solid rgba(${p => p.theme.colors.white}, 0.4);

        path {
            stroke: rgb(${p => p.theme.colors.white});
            fill: rgb(${p => p.theme.colors.white});
        }
    }
  }

  .modal-closeIcon {
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2px;
    padding: 2px;
    width: 100%;
    height: 100%;
  }
`;
