import React from "react";
import { arrayOf, bool, string, shape } from "prop-types";
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
  Label,
  Logo,
  LogoImg,
  Name,
  MustTry,
  MustTrySection,
  OrderNow,
  Placeholder,
  Placeholders,
  Picture,
  PreviewWrapper,
  Product,
  Products,
  ProductImage,
  ProductName,
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
  logo,
  menus,
  name,
  phone,
  pictures,
  priceRange,
  products,
  street,
  type,
  website
}) => {
  const t = useT("app");
  const checkProp = prop => prop || <Placeholder />;
  const hasPhone = !!(phone && phone.length);
  const hasMap = !!(street && street.length) || !!(city && city.length);
  const hasWebsite = !!(website && website.length);
  const hasMenus = menus && menus.length > 0;
  const hasProducts = products && products.length > 0;

  const HoursInfo = () => (
    <HoursWrapper>
      <IconImg src="/static/img/onboarding/clock.svg" />
      <Green>Open now:&nbsp;</Green>
      <span>See all hours</span>
    </HoursWrapper>
  );

  return (
    <PreviewWrapper>
      <Image>
        {pictures && pictures.length > 0 ? (
          <Picture src={pictures[0].url} />
        ) : (
          <Placeholder />
        )}
      </Image>
      <Wrapper>
        <TitleWrapper>
          <Name>{checkProp(name)}</Name>
          <Logo>{logo ? <LogoImg src={logo} /> : <Placeholder />}</Logo>
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
          <Feature>
            {hasMenus ? (
              <IconWrapper>
                <Icon>
                  <IconImg src="/static/img/onboarding/sheet.svg" />
                </Icon>
                <FeatureName>{t("manageIntegrations.menus")}</FeatureName>
              </IconWrapper>
            ) : (
              <Placeholder />
            )}
          </Feature>
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
        <MustTrySection>
          {hasProducts ? (
            <Label>
              <MustTry>Must Try</MustTry>
              <OrderNow>Order Now</OrderNow>
            </Label>
          ) : (
            <Label>
              <Placeholder />
              <Placeholder />
            </Label>
          )}
          <Products>
            {hasProducts
              ? products.map(product => (
                  <Product key={product.name}>
                    <ProductImage src={product.url} />
                    <ProductName>{product.name}</ProductName>
                  </Product>
                ))
              : [1, 2, 3].map(el => (
                  <Product key={el}>
                    <Placeholder />
                    <Placeholder />
                  </Product>
                ))}
          </Products>
        </MustTrySection>
      </Wrapper>
    </PreviewWrapper>
  );
};

MobilePreview.propTypes = {
  city: string,
  cuisine: string,
  description: string,
  hasHours: bool,
  logo: string,
  menus: string,
  name: string,
  phone: string,
  pictures: arrayOf(shape()),
  priceRange: string,
  products: arrayOf(shape()),
  street: string,
  type: string,
  website: string
};

MobilePreview.defaultProps = {
  city: "",
  cuisine: "",
  description: "",
  hasHours: false,
  logo: "",
  menus: "",
  name: "",
  phone: "",
  pictures: [],
  priceRange: "",
  products: [],
  street: "",
  type: "",
  website: ""
};

export default MobilePreview;
