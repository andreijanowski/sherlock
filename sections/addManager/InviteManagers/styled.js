import styled from "styled-components";
import { Paragraph } from "components";

export const DesciprtionWrapper = styled(Paragraph)`
  max-height: 30px;
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    text-align: start;
  }
`;

export const HelperTitle = styled.h2`
  margin: 0 0 16px 0;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f24};
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 558px;
  margin-bottom: 8px;
`;

export const FieldsContainer = styled.div`
  position: relative;
  max-width: 570px;
  max-height: calc(100vh - 330px);
  overflow-y: auto;
`;

export const RemoveButton = styled.button.attrs({
  type: "button"
})`
  position: absolute;
  top: 13px;
  right: 15px;
  width: 30px;
  height: 30px;
  background: transparent;
  border: solid rgba(${p => p.theme.colors.dark}, 0.4);
  border-radius: 100%;
  outline: none;
  cursor: pointer;
  &::after {
    position: absolute;
    top: 11px;
    left: 7px;
    width: 10px;
    height: 3px;
    background-color: rgba(${p => p.theme.colors.dark}, 0.4);
    content: "";
  }
  &:hover {
    border: solid rgba(${p => p.theme.colors.dark}, 1);
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
    &::after {
      background-color: rgba(${p => p.theme.colors.dark}, 1);
    }
  }
`;
