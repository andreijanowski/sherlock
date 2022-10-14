import React from "react";
import { shape } from "prop-types";

import {
  Container,
  Chapter,
  Description,
  FlexWrapper,
  Title,
  Image
} from "./styled";

const ChaptersSection = ({ chapters, pictures }) => {
  const pics = pictures && pictures.toJS();

  const getPicture = data => {
    const item = data && data.first();
    const id = item && item.getIn(["id"]);
    return (pics && id && pics[id].attributes.photo.url) || "";
  };

  const getAltText = data => {
    const item = data && data.first();
    const id = item && item.getIn(["id"]);
    return (pics && id && pics[id].attributes.altText) || "";
  };

  const orderedChapters =
    chapters &&
    chapters.toList().sortBy(item => item.getIn(["attributes", "order"]));

  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <FlexWrapper
        mb={550}
        mx={[20, null, null, "atuo"]}
        justifyContent="space-between"
        flexDirection="column"
        flexWrap="wrap"
      >
        {orderedChapters &&
          orderedChapters.map(chapter => (
            <Chapter key={chapter.getIn(["id"])}>
              <Title>{chapter.getIn(["attributes", "header"])}</Title>
              {pics && (
                <Image
                  src={getPicture(
                    chapter.getIn(["relationships", "pictures", "data"])
                  )}
                  alt={getAltText(
                    chapter.getIn(["relationships", "pictures", "data"])
                  )}
                />
              )}
              <Description>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: chapter.getIn(["attributes", "description"])
                  }}
                />
              </Description>
            </Chapter>
          ))}
      </FlexWrapper>
    </Container>
  );
};

ChaptersSection.propTypes = {
  chapters: shape().isRequired,
  pictures: shape().isRequired
};

export default ChaptersSection;
