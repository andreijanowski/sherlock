import styled, { createGlobalStyle } from "styled-components";

export const ModalStyles = createGlobalStyle`
  .modal-overlay {
  background-color: rgba(${p => p.theme.colors.dark}, 0.66);
  }

  .modal-modal {
    padding: 0;
    border-radius: 18px;
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
  border-radius: 18px;
  background-color: white;
  padding-bottom: 24px;
`;

export const Title = styled.div`
  background-color: ${p => `rgb(${p.theme.colors.b2bSecondary})`};
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  border-radius: 15px 15px 0 0;
  max-width: 620px;
`;

export const Image = styled.img`
  margin: 32px auto 46px;
`;
