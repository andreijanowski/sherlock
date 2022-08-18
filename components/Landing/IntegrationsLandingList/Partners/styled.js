import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { Subtitle } from "components/styleguide/Typography";
import { downThanBreakpoint } from "utils/theme";

export const Container = styled(Flex)`
  flex: auto;
  flex-direction: column;
  align-items: center;
  min-width: 780px;
  position: relative;
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
  max-width: 100%;
`;

export const SubtitleStyled = styled(Subtitle)`
  color: rgb(${p => p.theme.colors.landingDarkBlue});
  text-align: center;
`;
