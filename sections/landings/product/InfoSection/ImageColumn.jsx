import React from "react";
import { Box, Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { arrayOf, bool, number, oneOf, shape, string } from "prop-types";
import Link from "components/Link";
import { useLng, useT } from "utils/hooks";
import { VideoPreview, ImagesSlider } from "components/Landing";
import { Image, ImagesContainer } from "./styled";
import { getOptionPrefix } from "../utils";

const ImageColumn = ({
  width,
  isReversed,
  prefix,
  images,
  linkTo,
  activeOptionIndex,
  videos,
  sliderImages
}) => {
  const t = useT("landing");
  const lng = useLng();

  const linkText = t(`${prefix}.link`);

  const videoData = videos[getOptionPrefix(activeOptionIndex)];
  const hasSlider =
    sliderImages &&
    Boolean(sliderImages.length) &&
    sliderImages[activeOptionIndex] &&
    Boolean(sliderImages[activeOptionIndex].length);

  return (
    <Box
      width={width}
      ml={isReversed ? [0, null, null, 80] : undefined}
      mr={isReversed ? undefined : [0, null, null, 80]}
      mb={[24, null, null, 0]}
    >
      <ImagesContainer
        {...(isReversed
          ? {
              justifyContent: "flex-start",
              ml: "auto",
              mr: ["auto", null, null, 0]
            }
          : {
              justifyContent: ["flex-start", null, null, "flex-end"],
              mr: "auto",
              ml: ["auto", null, null, 0]
            })}
      >
        {!hasSlider &&
          (videoData ? (
            <VideoPreview {...videoData} />
          ) : (
            images.map(({ src, ...styleProps }, index) => (
              <Image
                key={src}
                src={src}
                {...styleProps}
                alt={`Image ${index + 1}`}
                loading="lazy"
              />
            ))
          ))}
        {hasSlider && (
          <ImagesSlider
            images={sliderImages[activeOptionIndex]}
            videos={videos}
            activeOptionIndex={activeOptionIndex}
            hasBlueDots
          />
        )}
      </ImagesContainer>
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
    </Box>
  );
};

ImageColumn.propTypes = {
  width: arrayOf(number).isRequired,
  linkTo: string.isRequired,
  isReversed: bool.isRequired,
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
  ).isRequired,
  activeOptionIndex: number.isRequired,
  videos: shape().isRequired,
  sliderImages: arrayOf(shape({}))
};

ImageColumn.defaultProps = {
  sliderImages: []
};

export default ImageColumn;
