import React from "react";
import { string } from "prop-types";

import {
  Description,
  Feature,
  FeaturesWrapper,
  Hours,
  Image,
  Logo,
  Name,
  Placeholder,
  Placeholders,
  PreviewWrapper,
  ReadMore,
  Tag,
  TagsWrapper,
  TitleWrapper,
  Wrapper
} from "./styled";

const MobilePreview = ({
  cuisine,
  description,
  img,
  logo,
  maps,
  menus,
  name,
  openingHours,
  phone,
  priceRange,
  reviews,
  type
}) => {
  const checkProp = prop => prop || <Placeholder />;
  const hasPhone = phone.length;

  return (
    <PreviewWrapper>
      <Image>{checkProp(img)}</Image>
      <Wrapper>
        <TitleWrapper>
          <Name>{checkProp(name)}</Name>
          <Logo>{checkProp(logo)}</Logo>
        </TitleWrapper>
        <TagsWrapper>
          <Tag>{checkProp(priceRange)}</Tag>
          <Tag>{checkProp(cuisine)}</Tag>
          <Tag>{checkProp(type)}</Tag>
        </TagsWrapper>
        <Hours>{checkProp(openingHours)}</Hours>
        <FeaturesWrapper>
          <Feature>{checkProp(hasPhone)}</Feature>
          <Feature>{checkProp(maps)}</Feature>
          <Feature>{checkProp(menus)}</Feature>
          <Feature>{checkProp(reviews)}</Feature>
        </FeaturesWrapper>
        <Description>
          {description || (
            <Placeholders>
              <Placeholder />
              <Placeholder />
            </Placeholders>
          )}
          {description ? (
            <ReadMore>Read more</ReadMore>
          ) : (
            <p>
              <Placeholder />
            </p>
          )}
        </Description>
      </Wrapper>
    </PreviewWrapper>
  );
};

MobilePreview.propTypes = {
  cuisine: string,
  description: string,
  img: string,
  logo: string,
  maps: string,
  menus: string,
  name: string,
  openingHours: string,
  phone: string,
  priceRange: string,
  reviews: string,
  type: string
};

MobilePreview.defaultProps = {
  cuisine: "",
  description: "",
  img: "",
  logo: "",
  maps: "",
  menus: "",
  name: "",
  openingHours: "",
  phone: "",
  priceRange: "",
  reviews: "",
  type: ""
};

export default MobilePreview;
