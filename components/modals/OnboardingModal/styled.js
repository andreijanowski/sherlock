import styled, { createGlobalStyle } from "styled-components";

export const ModalStyles = createGlobalStyle`
  .modal-overlay {
    background-color: rgba(${p => p.theme.colors.dark}, 0.66);
  }

  .modal-modal {
    padding: 38px;
    border-radius: 10px;
    max-width: 1250px;

    @media (max-width: 1400px) {
      transform: scale(0.9);
      margin-top: -50px;
    }
  }

  .modal-closeButton {
    display: none;
  }

  .modal-closeIcon {
    display: none;
  }
`;

export const BottomNavigation = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(${p => p.theme.colors.white});
  z-index: 1;
  padding-top: 36px;
`;
