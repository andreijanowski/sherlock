import styled from "styled-components";
import { Flex } from "@rebass/grid";

import Button from "components/Button";

export const Container = styled(Flex)`
  background-color: rgba(${p => p.theme.colors.background}, 1);
  border-radius: ${p => p.theme.radius.default};
`;

export const Image = styled.img`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 32px;
`;

export const ContentWrapper = styled(Flex)`
  flex-wrap: wrap;
  border-left: 1px solid rgba(${p => p.theme.colors.ghostWhite}, 1);
`;

export const Link = styled.a`
  margin: 8px 0;
  color: black;
`;

export const IntegrationButton = styled(Button)`
  && {
    width: auto;
    margin-left: 16px;
    padding: 8px 16px;
    cursor: default;
    ${p => p.styleName === "signUp" && "border-width: 2px"}
    ${p => p.styleName === "navyBlue" && "cursor: pointer"}
  }
`;

export const InfoButton = styled(Button)`
  && {
    width: auto;
    margin-left: 16px;
    padding: 8px 16px;
    cursor: default;

    ${Link} {
      color: white;
    }
  }
`;
