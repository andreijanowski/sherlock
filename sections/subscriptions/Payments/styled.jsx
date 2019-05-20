import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { RawInput } from "components";

export const Label = styled(Box).attrs({
  mb: 2
})`
  color: ${props => props.theme.colors.manatee};
  font-size: ${props => props.theme.fontSizes[1]};
`;

export const Input = styled(RawInput)`
  &:not([value=""]) {
    padding: 21px;
  }
`;

export const CardWrapper = styled(Flex).attrs({
  alignItems: "center",
  p: 2,
  mb: 2
})`
  color: rgb(${p => (p.selected ? p.theme.colors.white : p.theme.colors.blue)});
  background-color: rgba(
    ${p => `${p.theme.colors.blue}, ${p.selected ? 1 : 0.1}`}
  );
  border-radius: ${p => p.theme.radius.default};
  ${p =>
    !p.disabled &&
    `
    cursor: pointer;

    &:hover {
      color: rgb(${p.theme.colors.white});
      background-color: rgb(${p.theme.colors.blue});
    }
  `};
`;

export const Price = styled.div`
  margin-bottom: 16px;
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f36};
  line-height: 1.333;
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    text-align: start;
  }
  small {
    font-size: ${p => p.theme.fontSizes.f16};
  }
`;

export const Container = styled(Flex).attrs({
  width: 1,
  flexDirection: "column"
})`
  max-width: 600px;
`;

export const Line = styled.div`
  width: calc(100% + 64px);
  height: 1px;
  margin-left: -32px;
  background-color: rgb(${p => p.theme.colors.linkWaterLight});
`;
