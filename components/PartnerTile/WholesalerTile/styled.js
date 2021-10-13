import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Container = styled(Flex)`
  background-color: rgba(${p => p.theme.colors.background}, 1);
  border-radius: ${p => p.theme.radius.default};
`;

export const Image = styled.img`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 32px;
  @media (max-width: 1200px) {
    margin: 8px;
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
