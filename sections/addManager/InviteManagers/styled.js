import styled from "styled-components";
import { Box } from "@rebass/grid";
import { Paragraph } from "components";

export const DesciprtionWrapper = styled(Paragraph)`
  max-width: 360px;
  max-height: 30px;
`;

export const SuccessMessageWrapper = styled(Paragraph)`
  max-width: 558px;
  text-align: center;
  margin: 0 auto;
`;

export const HelperTitle = styled.h2`
  font-size: ${p => p.theme.fontSizes.f24};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  margin: 0 0 16px 0;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 558px;
  margin-bottom: 8px;
`;

export const ButtonContainer = styled.div`
  button {
    margin-right: 8px;
  }
`;

export const Separator = styled(Box).attrs(({ size }) => ({
  as: "hr",
  mt: size
}))`
  border: none;
`;

export const FieldsContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 330px);
  position: relative;
  max-width: 570px;
`;

export const RemoveButton = styled.button.attrs({
  type: "button"
})`
  border: solid rgba(${p => p.theme.colors.dark}, 0.4);
  outline: none;
  border-radius: 100%;
  position: absolute;
  width: 30px;
  height: 30px;
  background: transparent;
  cursor: pointer;
  right: 15px;
  top: 13px;
  &::after {
    content: "";
    background-color: rgba(${p => p.theme.colors.dark}, 0.4);
    position: absolute;
    width: 10px;
    height: 3px;
    left: 7px;
    top: 11px;
  }
  &:hover {
    border: solid rgba(${p => p.theme.colors.dark}, 1);
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
    &::after {
      background-color: rgba(${p => p.theme.colors.dark}, 1);
    }
  }
`;
