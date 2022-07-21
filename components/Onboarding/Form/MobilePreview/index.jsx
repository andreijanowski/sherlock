import React from "react";
import { arrayOf, string, shape } from "prop-types";
import { useT } from "utils/hooks";

import {
  AddInfo,
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
  Info,
  Label,
  Logo,
  LogoImg,
  Media,
  MustTry,
  MustTrySection,
  Name,
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
  // RevealButton,
  Review,
  Reviews,
  Tag,
  TagsWrapper,
  TitleWrapper,
  Wrapper,
  RevealButtonWrapper
} from "./styled";

const MobilePreview = ({
  city,
  cuisine,
  bio,
  periods,
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
  const hasMenus = !!(menus && menus.length);
  const hasProducts = !!(products && products.length);
  const hasPictures = !!(pictures && pictures.length);
  const hasHours = !!(periods && Object.keys(periods).length);

  const HoursInfo = () => (
    <HoursWrapper>
      <IconImg src="/static/img/onboarding/clock.svg" />
      <Green>Open now:&nbsp;</Green>
      <span>See all hours</span>
    </HoursWrapper>
  );

  return (
    <PreviewWrapper scroll>
      <Image>
        {hasPictures ? <Picture src={pictures[0].url} /> : <Placeholder />}
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
          {bio ? (
            <p>{bio}</p>
          ) : (
            <Placeholders>
              <Placeholder />
              <Placeholder />
            </Placeholders>
          )}
          {bio ? (
            <ReadMore>Read more</ReadMore>
          ) : (
            <b>
              <Placeholder />
            </b>
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
        <Reviews>
          <Label>
            <Placeholder />
          </Label>
          <Products>
            <Review>
              <Placeholder />
            </Review>
            <Review>
              <Placeholder />
            </Review>
          </Products>
          <RevealButtonWrapper>
            <Placeholder />
          </RevealButtonWrapper>
        </Reviews>
        <AddInfo>
          <Label>
            <Placeholder />
          </Label>
          {[1, 2, 3, 4].map(el => (
            <Info key={el}>
              <Placeholder />
            </Info>
          ))}
          <RevealButtonWrapper>
            <Placeholder />
          </RevealButtonWrapper>
        </AddInfo>
        <Media>
          <Label>
            <Placeholder />
          </Label>
          <TagsWrapper>
            {[1, 2, 3].map(el => (
              <Feature key={el}>
                <Placeholder />
              </Feature>
            ))}
          </TagsWrapper>
        </Media>
      </Wrapper>
    </PreviewWrapper>
  );
};

MobilePreview.propTypes = {
  city: string,
  cuisine: string,
  bio: string,
  logo: string,
  menus: arrayOf(shape()),
  name: string,
  periods: shape(),
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
  bio: "",
  logo: "",
  menus: [],
  name: "",
  periods: {},
  phone: "",
  pictures: [],
  priceRange: "",
  products: [],
  street: "",
  type: "",
  website: ""
};

export default MobilePreview;
