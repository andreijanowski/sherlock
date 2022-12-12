import styled, { createGlobalStyle } from "styled-components";
import StyledButton from "components/styleguide/Button";

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
  max-width: ${p => p.maxWidth};
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

export const Disclaimer = styled.p`
  margin: 20px;
  max-width: 100%;
  font-size: 12px;
  text-align: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CancelButton = styled(StyledButton)`
  border: 1px solid ${p => `rgb(${p.theme.colors.b2bSecondary})`};
  color: ${p => `rgb(${p.theme.colors.b2bSecondary})`};
  margin-right: 20px;
`;
