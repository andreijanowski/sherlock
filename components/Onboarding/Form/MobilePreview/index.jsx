import React from "react";
import { bool, string } from "prop-types";
import { useT } from "utils/hooks";

import {
  Description,
  Feature,
  FeatureName,
  FeaturesWrapper,
  Green,
  Hours,
  HoursWrapper,
  Icon,
  IconImg,
  IconWrapper,
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
  city,
  cuisine,
  description,
  hasHours,
  img,
  logo,
  menus,
  name,
  phone,
  priceRange,
  street,
  type,
  website
}) => {
  const t = useT("app");
  const checkProp = prop => prop || <Placeholder />;
  const hasPhone = !!(phone && phone.length);
  const hasMap = !!(street && street.length) || !!(city && city.length);
  const hasWebsite = !!(website && website.length);

  const HoursInfo = () => (
    <HoursWrapper>
      <IconImg src="/static/img/onboarding/clock.svg" />
      <Green>Open now:&nbsp;</Green>
      <span>See all hours</span>
    </HoursWrapper>
  );

  return (
    <PreviewWrapper>
      <Image>{checkProp(img)}</Image>
      <Wrapper>
        <TitleWrapper>
          <Name>{checkProp(name)}</Name>
          <Logo>{logo ? <IconImg src={logo} /> : <Placeholder />}</Logo>
        </TitleWrapper>
        <TagsWrapper>
          <Tag>{checkProp(priceRange)}</Tag>
          <Tag>{checkProp(cuisine)}</Tag>
          <Tag>{checkProp(type)}</Tag>
        </TagsWrapper>
        <Hours>{hasHours ? <HoursInfo /> : <Placeholder />}</Hours>
        <FeaturesWrapper>
          <Feature>
            {hasPhone ? (
              <IconWrapper>
                <Icon>
                  <IconImg src="/static/img/onboarding/phone.svg" />
                </Icon>
                <FeatureName>{t("manageIntegrations.call")}</FeatureName>
              </IconWrapper>
            ) : (
              <Placeholder />
            )}
          </Feature>
          <Feature>
            {hasMap ? (
              <IconWrapper>
                <Icon>
                  <IconImg src="/static/img/onboarding/mappin.svg" />
                </Icon>
                <FeatureName>{t("manageIntegrations.map")}</FeatureName>
              </IconWrapper>
            ) : (
              <Placeholder />
            )}
          </Feature>
          <Feature>{menus ? <IconWrapper /> : <Placeholder />}</Feature>
          <Feature>
            {hasWebsite ? (
              <IconWrapper>
                <Icon>
                  <IconImg src="/static/img/onboarding/reviews.svg" />
                </Icon>
                <FeatureName>{t("manageIntegrations.reviews")}</FeatureName>
              </IconWrapper>
            ) : (
              <Placeholder />
            )}
          </Feature>
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
  city: string,
  cuisine: string,
  description: string,
  hasHours: bool,
  img: string,
  logo: string,
  menus: string,
  name: string,
  phone: string,
  priceRange: string,
  street: string,
  type: string,
  website: string
};

MobilePreview.defaultProps = {
  city: "",
  cuisine: "",
  description: "",
  hasHours: false,
  img: "",
  logo: "",
  menus: "",
  name: "",
  phone: "",
  priceRange: "",
  street: "",
  type: "",
  website: ""
};

export default MobilePreview;
