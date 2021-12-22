import React from "react";
import { Box, Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { arrayOf, bool, number, oneOf, shape, string } from "prop-types";
import Link from "components/Link";
import { useLng, useT } from "utils/hooks";
import { Image, ImagesContainer } from "./styled";

const ImageColumn = ({ width, isDark, prefix, images, linkTo }) => {
  const t = useT("landing");
  const lng = useLng();

  const linkText = t(`${prefix}.link`);

  return (
    <Box
      width={width}
      ml={isDark ? 80 : undefined}
      mr={isDark ? undefined : 80}
    >
      <ImagesContainer justifyContent={isDark ? "flex-start" : "flex-end"}>
        {images.map(({ src, ...styleProps }) => (
          <Image key={src} src={src} {...styleProps} alt="" />
        ))}
        {linkTo && linkText && (
          <Link lng={lng} route={linkTo}>
            <Flex as="a" mt={27} justifyContent="center" alignItems="center">
              {linkText}
              <Box ml={2}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Box>
            </Flex>
          </Link>
        )}
      </ImagesContainer>
    </Box>
  );
};

ImageColumn.propTypes = {
  width: arrayOf(number).isRequired,
  linkTo: string.isRequired,
  isDark: bool.isRequired,
  prefix: string.isRequired,
  images: arrayOf(
    shape({
      src: string.isRequired,
      width: arrayOf(oneOf([string, number])),
      top: number,
      right: number,
      bottom: number,
      left: number
    })
  ).isRequired
};

export default ImageColumn;
