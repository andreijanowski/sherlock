import styled, { createGlobalStyle } from "styled-components";

export const ModalStyles = createGlobalStyle`
  .modal-overlay {
    background-color: rgba(${p => p.theme.colors.dark}, 0.66);
  }

  .modal-modal {
    padding: 38px;
    border-radius: 10px;

    @media (max-width: 1450px) {
      transform: scale(0.85);
      margin-top: -50px;
    }

    @media (min-width: 1250px) {
      max-width: 1250px;
    }
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

export const Error = styled.div`
  position: absolute;
  font-size: 14px;
  top: 10px;
  color: rgb(${p => p.theme.colors.ruby});
`;
