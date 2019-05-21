import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const InputError = styled.span`
  position: absolute;
  top: -20px;
  left: 0;
  color: rgb(${p => p.theme.colors.ruby});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: 20px;
`;

export const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: ${p => p.theme.borderWeights.normal} solid
    rgba(
      ${({ theme, error }) =>
        error ? `${theme.colors.ruby}, 1` : `${theme.colors.dark}, 0.16`}
    );
  border-radius: 100%;
  :after {
    top: 5px;
    left: 9px;
    width: 4px;
    height: 6px;
    margin-bottom: 2px;
    border: solid transparent;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    content: "";
  }
`;

export const CheckboxContainer = styled(Flex).attrs({
  as: "label",
  alignItems: "center"
})`
  position: relative;
  width: 100%;
  max-width: 558px;
  margin-bottom: 12px;
  padding-left: 35px;
  color: rgba(${p => p.theme.colors.dark}, 0.4);
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 20px;
  white-space: pre-wrap;
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
  width: 0;
  height: 0;
  cursor: pointer;
  opacity: 0;
  &:checked ~ ${Checkmark} {
    background-color: rgb(${p => p.theme.colors.blue});
    border-color: rgb(${p => p.theme.colors.blue});
    box-shadow: 0px 2px 6px 0px rgba(${p => p.theme.colors.dark}, 0.1);
    &:after {
      border-color: white;
    }
  }
`;
