import React from "react";

import { bool, func, shape } from "prop-types";

import { addProtocol } from "utils/urls";
import { useT } from "utils/hooks";
import { SwitchBlogButton } from "components/Landing";
import {
  Container,
  FlexWrapper,
  Title,
  StyledH2,
  StyledH3,
  Image,
  FeatureLabel,
  InfoLabel,
  MainArticle
} from "./styled";

const TopSection = ({
  onContentChange,
  isBlog,
  isFetching,
  article,
  image
}) => {
  const t = useT("landing");

  return (
    <Container pt={[20, null, null, 20]} pb={52} px={[3, null, null, 4]}>
      <Title>{t("landings.newsroom.title")}</Title>
      <SwitchBlogButton
        onChange={onContentChange}
        isBlog={isBlog}
        isFetching={isFetching}
      />
      {article && (
        <FlexWrapper
          mb={250}
          mx={[20, null, null, "atuo"]}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <MainArticle
            href={
              isBlog
                ? article.getIn(["links", "self"])
                : addProtocol(article.getIn(["attributes", "url"]))
            }
            target={isBlog ? "" : "_blank"}
          >
            <FeatureLabel>{t("landings.newsroom.featured")}</FeatureLabel>
            {isBlog && (
              <InfoLabel>
                {`  •  ${article.getIn([
                  "attributes",
                  "category"
                ])}  •  ${article.getIn([
                  "attributes",
                  "readDuration"
                ])} min read`}
              </InfoLabel>
            )}
            <StyledH2>
              {isBlog
                ? article.getIn(["attributes", "headline"])
                : article.getIn(["attributes", "headline"])}
            </StyledH2>
            <StyledH3>
              {isBlog
                ? article.getIn(["attributes", "summary"])
                : article.getIn(["attributes", "date"])}
            </StyledH3>
          </MainArticle>
          {image && <Image src={image} />}
        </FlexWrapper>
      )}
    </Container>
  );
};

TopSection.propTypes = {
  onContentChange: func.isRequired,
  isBlog: bool.isRequired,
  article: shape().isRequired,
  image: shape().isRequired,
  isFetching: bool.isRequired
};

export default TopSection;
