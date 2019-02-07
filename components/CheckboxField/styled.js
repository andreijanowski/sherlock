import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const InputError = styled.span`
  color: rgb(${p => p.theme.colors.ruby});
  font-size: ${p => p.theme.fontSizes.f12};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  position: absolute;
  left: 0;
  top: -20px;
  line-height: 20px;
`;

export const Checkmark = styled.span`
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(
      ${({ theme, error }) =>
        error ? `${theme.colors.ruby}, 1` : `${theme.colors.dark}, 0.16`}
    );
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  :after {
    content: "";
    left: 9px;
    top: 5px;
    width: 4px;
    height: 6px;
    margin-bottom: 2px;
    border: solid rgba(${p => p.theme.colors.dark}, 0.4);
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const CheckboxContainer = styled(Flex).attrs({
  as: "label",
  alignItems: "center"
})`
  white-space: pre-wrap;
  color: rgba(${p => p.theme.colors.dark}, 0.4);
  font-size: ${p => p.theme.fontSizes.f14};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  line-height: 20px;
  position: relative;
  width: 100%;
  max-width: 558px;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
  a {
    text-decoration: none;
  }
`;

export const Checkbox = styled.input.attrs({
  type: "checkbox"
})`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ ${Checkmark} {
    background-color: rgb(${p => p.theme.colors.blue});
    border-color: rgb(${p => p.theme.colors.blue});
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
    &:after {
      border-color: white;
    }
  }
`;
