import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Form = styled(Flex).attrs({
  as: "form",
  flexDirection: "column",
  p: [3, 4],
  width: 1
})`
  border-radius: ${p => p.theme.radius.default};
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const Actions = styled(Flex).attrs({
  width: 96,
  mb: 3
})`
  /* stylelint-disable no-empty-block */
`;

export const Image = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${p => p.theme.radius.default};
  background-image: url(${p => p.url});
  background-position: center;
  background-size: cover;
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
