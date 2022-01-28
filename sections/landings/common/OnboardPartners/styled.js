import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { WRAPPER_WIDTH, themeGet } from "utils/theme";
import { Subtitle } from "components/styleguide/Typography";

export const Container = styled(Box).attrs({ mx: "auto" })`
  max-width: ${WRAPPER_WIDTH}px;
  width: 100%;
`;

export const ImagesContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ImageContainer = styled(Box)`
  text-align: center;
`;

export const Image = styled(Box).attrs({ as: "img" })``;

export const SubtitleStyled = styled(Subtitle)`
  text-align: center;
  color: rgb(
    ${p => themeGet(p.isDark ? "colors.white" : "colors.b2bSecondary")}
  );
`;
