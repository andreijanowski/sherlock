import styled, { createGlobalStyle } from "styled-components";

export const ModalStyles = createGlobalStyle`
  .modal-overlay {
    padding: 16px;
    background-color: rgba(${p => p.theme.colors.dark}, 0.16);
    @media (min-width: ${p => p.theme.breakpoints[0]}) {
      padding: 32px;
    }
  }

  .modal-modal {
    max-width: calc(100vw - 32px);
    padding: 16px;
    border-radius: ${p => p.theme.radius.default};
    @media (min-width: ${p => p.theme.breakpoints[0]}) {
      max-width: calc(100vw - 64px);
      padding: 32px;
    }
  }

  .modal-closeButton {
    top: 12px;
    right: 12px;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(${p => p.theme.colors.dark}, 0.4);
    border-radius: 100%;
    cursor: pointer;

    path {
        fill: rgb(${p => p.theme.colors.dark});
        stroke: rgb(${p => p.theme.colors.dark});
    }

    &:hover {
        background-color: rgb(${p => p.theme.colors.dark});
        border: 2px solid rgba(${p => p.theme.colors.white}, 0.4);

        path {
            fill: rgb(${p => p.theme.colors.white});
            stroke: rgb(${p => p.theme.colors.white});
        }
    }
  }

  .modal-closeIcon {
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2px;
    width: 100%;
    height: 100%;
    padding: 2px;
  }
`;

export const ModalHeader = styled.h3`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.regular};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 1.5;
  text-align: center;
`;
