import styled, { createGlobalStyle } from "styled-components";

export const ModalStyles = createGlobalStyle`
  .modal-modal {
    padding: 0;
    border-radius: 18px;
    max-width: 1500px;
    position: absolute;
    left: 60%;
    transform: translate(-60%, 0);
    min-width: 450px;
  }

  .modal-closeButton {
    align-items: center;
    justify-content: center;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
  }

  .modal-closeIcon {
    width: 60%;
    height: 60%;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  border-radius: 18px;
  background-color: white;
  padding: 24px;
  justify-content: space-between;
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

export const Header = styled.div`
  justify-content: space-between;
`;

export const Disclaimer = styled.p`
  margin: 20px;
  max-width: 100%;
  font-size: 12px;
`;

export const ImageContainer = styled.div`
  padding: 6px;
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0px 2px 11px rgba(42, 90, 234, 0.22);
`;

export const Image = styled.img`
  display: flex;
  align-items: center;
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

export const Name = styled.div`
  color: rgb(${p => p.theme.colors.darkBlue});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: ${p => p.theme.fontSizes.f21};
`;

export const Description = styled.div`
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: ${p => p.theme.fontSizes.f19};
`;
