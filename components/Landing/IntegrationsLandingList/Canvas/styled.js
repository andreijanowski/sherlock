import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { Subtitle } from "components/styleguide/Typography";

export const Container = styled(Flex)`
  flex-direction: column;
  align-items: center;
  min-width: 600px;
  position: relative;
`;

export const SubtitleStyled = styled(Subtitle)`
  color: rgb(${p => p.theme.colors.landingDarkBlue});
`;
