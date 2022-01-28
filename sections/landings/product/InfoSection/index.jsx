import React, { useState } from "react";
import { Flex } from "@rebass/grid";
import { arrayOf, bool, number, oneOf, shape, string, node } from "prop-types";

import { useT } from "utils/hooks";
import { Container } from "./styled";
import ImageColumn from "./ImageColumn";
import { getPrefix } from "../utils";
import TextColumn from "./TextColumn";
import Header from "./Header";

const InfoSection = ({
  name,
  icon,
  images,
  isDark,
  columnsProportions,
  linkTo,
  advantagesColumnsWidth,
  textLinks,
  videos,
  step,
  isReversed = isDark,
  ctaButton,
  isAdvantagesCentered
}) => {
  const t = useT("landing");
  const prefix = getPrefix(name);
  const options = t(`${prefix}.options`, { returnObjects: true });

  const [activeOptionIndex, setActiveOptionIndex] = useState(0);

  return (
    <Container>
      <Header
        isDark={isDark}
        icon={icon}
        activeOptionIndex={activeOptionIndex}
        setActiveOptionIndex={setActiveOptionIndex}
        options={options}
        prefix={prefix}
      />

      <Flex
        flexDirection={[
          "column",
          null,
          null,
          isReversed ? "row-reverse" : "row"
        ]}
        alignItems="flex-start"
      >
        <ImageColumn
          width={columnsProportions[0]}
          images={images}
          isReversed={isReversed}
          linkTo={linkTo}
          prefix={prefix}
          activeOptionIndex={activeOptionIndex}
          videos={videos}
        />
        <TextColumn
          step={step}
          textLinks={textLinks}
          width={columnsProportions[1]}
          isDark={isDark}
          activeOptionIndex={activeOptionIndex}
          setActiveOptionIndex={setActiveOptionIndex}
          prefix={prefix}
          advantagesColumnsWidth={advantagesColumnsWidth}
          options={options}
          ctaButton={ctaButton}
          isAdvantagesCentered={isAdvantagesCentered}
        />
      </Flex>
    </Container>
  );
};

InfoSection.propTypes = {
  name: string.isRequired,
  icon: string,
  linkTo: string,
  images: arrayOf(
    shape({
      src: string.isRequired,
      width: arrayOf(oneOf([string, number])),
      top: number,
      right: number,
      bottom: number,
      left: number
    })
  ),
  isDark: bool,
  isReversed: bool,
  isAdvantagesCentered: bool,
  columnsProportions: arrayOf(arrayOf(number)).isRequired,
  advantagesColumnsWidth: arrayOf(oneOf([arrayOf(number), number, string])),
  textLinks: shape({}),
  videos: shape({}),
  step: number,
  ctaButton: node
};

InfoSection.defaultProps = {
  step: null,
  icon: null,
  linkTo: null,
  isDark: false,
  isAdvantagesCentered: false,
  isReversed: undefined,
  advantagesColumnsWidth: [1, null, null, 1 / 2],
  textLinks: {},
  videos: {},
  images: [],
  ctaButton: null
};

export default InfoSection;
