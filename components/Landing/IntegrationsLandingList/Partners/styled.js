import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { Button } from "components";
import { Subtitle } from "components/styleguide/Typography";
import { downThanBreakpoint } from "utils/theme";

export const Container = styled(Flex)`
  flex: auto;
  flex-direction: column;
  align-items: center;
  min-width: 870px;
  width: 100%;
  position: relative;
  ${downThanBreakpoint(3)} {
    min-width: 700px;
  }
  ${downThanBreakpoint(2)} {
    min-width: 500px;
  }
  ${downThanBreakpoint(1)} {
    padding-top: 24px;
    min-width: 0;
  }
`;

export const PartnersListContainer = styled.div`
  flex: auto;
  width: 100%;
`;

export const SubtitleStyled = styled(Subtitle)`
  color: rgb(${p => p.theme.colors.landingDarkBlue});
  text-align: center;
`;

export const PartnersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 36px;
`;

export const MoreButton = styled(Button)`
  border: 0;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  background-color: transparent;
  margin-bottom: 55px;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    color: rgb(${p => p.theme.colors.blue});
  }
`;
