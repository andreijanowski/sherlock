import React, { useState } from "react";
import { Flex } from "@rebass/grid";
import { arrayOf, bool, number, oneOf, shape, string } from "prop-types";

import { useT } from "utils/hooks";
import { Container } from "./styled";
import ImageColumn from "./ImageColumn";
import { getPrefix } from "./utils";
import TextColumn from "./TextColumn";
import Header from "./Header";

const InfoSection = ({
  name,
  icon,
  images,
  isDark,
  columnsProportions,
  linkTo
}) => {
  const t = useT("landing");
  const prefix = getPrefix(name);
  const options = t(`${prefix}.options`, { returnObjects: true });

  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  const activeOption = options[activeOptionIndex];

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

      <Flex flexDirection={["column", null, isDark ? "row-reverse" : "row"]}>
        <ImageColumn
          width={columnsProportions[0]}
          images={images}
          isDark={isDark}
          linkTo={linkTo}
          prefix={prefix}
        />
        <TextColumn
          width={columnsProportions[1]}
          isDark={isDark}
          activeOption={activeOption}
          prefix={prefix}
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
  ).isRequired,
  isDark: bool,
  columnsProportions: arrayOf(arrayOf(number)).isRequired
};

InfoSection.defaultProps = {
  icon: null,
  linkTo: null,
  isDark: false
};

export default InfoSection;
