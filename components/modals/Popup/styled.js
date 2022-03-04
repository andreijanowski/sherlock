import styled, { createGlobalStyle } from "styled-components";

export const ModalStyles = createGlobalStyle`
  .modal-overlay {
    background-color: rgba(${p => p.theme.colors.dark}, 0.66);
  }

  .modal-modal {
    padding: 0;
    border-radius: 16px;
  }

  .modal-closeButton {
    display: none;
  }

  .modal-closeIcon {
    display: none;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 16px;
  background-color: white;
  padding-bottom: 24px;
  overflow: hidden;
`;

export const Title = styled.div`
  background-color: ${p => `rgb(${p.theme.colors.b2bSecondary})`};
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: calc(100% + 32px);
  text-align: center;
`;

export const Image = styled.img`
  margin: 32px auto 46px;
`;
