import React from "react";
import { number, string, bool } from "prop-types";

import { useT } from "utils/hooks";
import {
  Container,
  ImagesContainer,
  ImageContainer,
  Image,
  SubtitleStyled
} from "./styled";

const OnboardPartners = ({ prefix, count, isDark, ...props }) => {
  const t = useT("landing");

  return (
    <Container mt={90} {...props}>
      <SubtitleStyled isDark={isDark}>{t("alreadyOnboard")}</SubtitleStyled>
      <ImagesContainer mt={55} mb={[0, null, null, 55]} flexWrap="wrap">
        {new Array(count).fill(null).map((_v, index) => {
          const url = `${prefix}-${index + 1}.png`;
          return (
            <ImageContainer
              width={["100%", null, "auto"]}
              key={url}
              px={3}
              mb={3}
            >
              <Image src={url} loading="lazy" />
            </ImageContainer>
          );
        })}
      </ImagesContainer>
    </Container>
  );
};

OnboardPartners.propTypes = {
  isDark: bool,

  prefix: string.isRequired,
  count: number.isRequired
};

OnboardPartners.defaultProps = {
  isDark: false
};

export default OnboardPartners;
