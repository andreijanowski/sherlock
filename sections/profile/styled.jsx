import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Form = styled(Flex).attrs({
  as: "form",
  flexDirection: "column",
  p: [3, 4],
  width: 1
})`
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const Actions = styled(Flex).attrs({
  width: 96,
  mb: 3
})`
  /* stylelint-disable-line no-empty-block */
`;

export const PublishMobileIconWrapper = styled(Flex).attrs({
  alignItems: "center",
  mb: 2
})`
  background-color: rgb(${p => p.theme.colors.white});
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: none;
  }
`;

export const PublishHeader = styled.p`
  margin-left: 8px;
`;

export const TypesWrapper = styled(Flex).attrs({
  mx: -2,
  flexWrap: "wrap"
})`
  position: relative;
`;
