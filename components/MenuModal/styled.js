import styled, { createGlobalStyle } from "styled-components";
import { Button } from "components";

export const ModalStyles = createGlobalStyle`
  .modal-modal {
    min-width: 300px;
    padding: 56px 24px;
    border-radius: ${p => p.theme.radius.semi};
    background-color: rgb(${p => p.theme.colors.lightBlue});

    > div {
      display: flex;
      flex-direction: column;
    }
  }

  .modal-closeButton {
    align-items: center;
    justify-content: center;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    border: 0;
  }

  .modal-closeIcon {
    width: 60%;
    height: 60%;
  }
`;

export const UploadButton = styled.button`
  position: absolute;
  bottom: 24px;
  right: 24px;
  border: 0;
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;
  color: rgb(${p => p.theme.colors.blue});
`;

export const DownloadButton = styled(Button).attrs({
  styleName: "blue"
})`
  border-radius: 22px;
  margin-top: 24px;
  color: rgb(${p => p.theme.colors.black});
  width: fit-content;

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding: 8px 25px;
  }
`;

export const DropdownWrapper = styled.div`
  min-width: 300px;
`;

export const InfoLabel = styled.div`
  position: relative;
  background: rgb(${p => p.theme.colors.yellow});
  border-radius: 10px;
  color: rgb(${p => p.theme.colors.white});
  font-size: 14px;
  padding: 10px;
  padding-left: 44px;
  text-align: initial;

  > svg {
    position: absolute;
    fill: rgb(${p => p.theme.colors.white});
    left: 15px;
    top: ${p => p.top || "15px"};
    height: 20px;
    width: 20px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const InfoWrapper = styled.div`
  max-width: 518px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  text-align: center;
  font-size: 18px;
  line-height: 25.2px;
`;

export const BlueSpan = styled.span`
  color: rgb(${p => p.theme.colors.blue});
`;
