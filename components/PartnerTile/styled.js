import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Flex } from "@rebass/grid";

import Button from "components/Button";

export const Container = styled(Flex)`
  background-color: rgba(${p => p.theme.colors.background}, 1);
  border-radius: ${p => p.theme.radius.default};
`;

export const ButtonContainer = styled(Flex)`
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  @media (min-width: 1024px) {
    justify-content: flex-end;
  }
`;

export const LinkContainer = styled(Flex)`
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const Image = styled.img`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 32px;
  @media (max-width: 1200px) {
    margin: 8px 0 8px 16px;
  }
`;

export const ContentWrapper = styled(Flex)`
  flex-wrap: wrap;
  border-left: 1px solid rgba(${p => p.theme.colors.ghostWhite}, 1);
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

export const IconAdded = styled(FontAwesomeIcon)`
  color: ${p => `#${p.added ? "de1154" : "03a04f"}`};
  cursor: pointer;
  margin: 0 0 0 1em;
`;

export const Link = styled.a`
  margin: 8px 8px 8px 0;
  color: black;
  @media (max-width: 832px) {
    margin-bottom: 16px;
  }
`;

export const IntegrationButton = styled(Button)`
  && {
    width: auto;
    flex: none;
    margin-right: 16px;
    padding: 8px 16px;
    cursor: default;
    @media (max-width: 1024px) {
      margin: 0 0 8px 0;
    }
    ${p => p.styleName === "signUp" && "border-width: 2px"}
    ${p =>
      (p.styleName === "navyBlue" || p.styleName === "outlineBlue") &&
      "cursor: pointer"}
  }
`;

export const InfoButton = styled(Button)`
  && {
    width: auto;
    flex: none;
    padding: 8px 16px;
    cursor: default;

    ${Link} {
      color: white;
    }
  }
`;
