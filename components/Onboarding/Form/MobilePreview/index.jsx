import React from "react";
import { arrayOf, string, shape, number, bool } from "prop-types";
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
  LiveInfo,
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
  PreviewButtons,
  PreviewWrapper,
  Price,
  Product,
  Products,
  ProductImage,
  ProductName,
  ReadMore,
  RevealButton,
  RevealButtonWrapper,
  Review,
  Reviews,
  Tag,
  TagsWrapper,
  TitleWrapper,
  Wrapper
} from "./styled";

const MobilePreview = ({
  city,
  cuisines,
  bio,
  diets,
  facebook,
  instagram,
  logo,
  liveInfo,
  foodsAndDrinks,
  quirks,
  periods,
  menus,
  michelinStars,
  name,
  phone,
  pictures,
  pricePerPerson,
  products,
  street,
  types,
  website,
  deliveryUrl,
  onlineBookingUrl,
  takeawayUrl,
  canPayWithMobile
}) => {
  const t = useT(["app", "additionalInformation"]);
  const checkProp = prop => prop || <Placeholder />;
  const hasPhone = !!(phone && phone.length);
  const hasMap = !!(street && street.length) || !!(city && city.length);
  const hasWebsite = !!(website && website.length);
  const hasMenus = !!(menus && menus.length);
  const hasProducts = !!(products && products.length);
  const hasPictures = !!(pictures && pictures.length);
  const hasHours = !!(periods && Object.keys(periods).length);
  const hasAddInfo = !!(
    (foodsAndDrinks && foodsAndDrinks.length) ||
    (quirks && quirks.length) ||
    (diets && diets.length) ||
    (michelinStars && michelinStars.length)
  );
  const hasButtons = !!(
    deliveryUrl ||
    onlineBookingUrl ||
    takeawayUrl ||
    canPayWithMobile
  );
  const hasMedia = facebook || instagram || website;
  const media = {
    facebook,
    instagram,
    website
  };

  const additionalItems = [
    ...foodsAndDrinks,
    ...quirks,
    ...diets,
    ...michelinStars
  ].slice(0, 4);

  const HoursInfo = () => (
    <HoursWrapper>
      <IconImg src="/static/img/onboarding/clock.svg" />
      <Green>{t("openNow")}&nbsp;</Green>
      <span>{t("seeAllHours")}</span>
    </HoursWrapper>
  );

  return (
    <PreviewWrapper scroll>
      <Image>
        {liveInfo && <LiveInfo>{liveInfo}</LiveInfo>}
        {hasPictures ? <Picture src={pictures[0].url} /> : <Placeholder />}
      </Image>
      <Wrapper>
        <TitleWrapper>
          <Name>{checkProp(name)}</Name>
          <Logo>{logo ? <LogoImg src={logo} /> : <Placeholder />}</Logo>
        </TitleWrapper>
        <TagsWrapper>
          <Tag>
            {pricePerPerson ? (
              <Price>
                €€€<span>€€</span>
              </Price>
            ) : (
              <Placeholder />
            )}
          </Tag>
          <Tag>
            {(cuisines && cuisines[0] && ` • ${cuisines[0].label} • `) || (
              <Placeholder />
            )}
          </Tag>
          <Tag>{checkProp(types && types[0] && types[0].label)}</Tag>
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
            <ReadMore>{t("readMore")}</ReadMore>
          ) : (
            <b>
              <Placeholder />
            </b>
          )}
        </Description>
        <MustTrySection>
          {hasProducts ? (
            <Label>
              <MustTry>{t("mustTry")}</MustTry>
              <OrderNow>{t("manageIntegrations.orderNow")}</OrderNow>
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
            {hasAddInfo ? (
              <MustTry>{t("additionalInformation:shortHeader")}</MustTry>
            ) : (
              <Placeholder />
            )}
          </Label>
          {hasAddInfo
            ? additionalItems.map(i => <Info key={i.label}> • {i.label}</Info>)
            : [0, 1, 2, 3].map(el => (
                <Info key={el}>
                  <Placeholder />
                </Info>
              ))}
          <RevealButtonWrapper>
            {hasAddInfo ? (
              <RevealButton>{t("additionalInformation:seeAll")}</RevealButton>
            ) : (
              <Placeholder />
            )}
          </RevealButtonWrapper>
        </AddInfo>
        <Media>
          <Label>
            {hasMedia ? (
              <MustTry>
                {t("additionalInformation:serviceLinkCategory.social_media")}
              </MustTry>
            ) : (
              <Placeholder />
            )}
          </Label>
          <TagsWrapper>
            {["instagram", "facebook", "website"].map(site => (
              <Feature key={site} mr="16px" size="22px">
                <Logo>
                  {media[site] ? (
                    <LogoImg src={`/static/img/onboarding/${site}Logo.svg`} />
                  ) : (
                    <Placeholder />
                  )}
                </Logo>
              </Feature>
            ))}
          </TagsWrapper>
        </Media>
      </Wrapper>
      {hasButtons && (
        <PreviewButtons src="/static/img/onboarding/previewbuttons.png" />
      )}
    </PreviewWrapper>
  );
};

MobilePreview.propTypes = {
  city: string,
  cuisines: arrayOf(shape()),
  bio: string,
  foodsAndDrinks: arrayOf(shape()),
  diets: arrayOf(shape()),
  quirks: arrayOf(shape()),
  liveInfo: string,
  logo: string,
  menus: arrayOf(shape()),
  michelinStars: arrayOf(shape()),
  name: string,
  periods: shape(),
  phone: string,
  pictures: arrayOf(shape()),
  pricePerPerson: number,
  products: arrayOf(shape()),
  street: string,
  types: arrayOf(shape()),
  website: string,
  deliveryUrl: string,
  onlineBookingUrl: string,
  takeawayUrl: string,
  canPayWithMobile: bool,
  facebook: string,
  instagram: string
};

MobilePreview.defaultProps = {
  city: "",
  cuisines: [],
  bio: "",
  foodsAndDrinks: [],
  diets: [],
  quirks: [],
  liveInfo: "",
  logo: "",
  menus: [],
  michelinStars: [],
  name: "",
  periods: {},
  phone: "",
  pictures: [],
  pricePerPerson: 0,
  products: [],
  street: "",
  types: [],
  website: "",
  facebook: "",
  instagram: "",
  deliveryUrl: "",
  onlineBookingUrl: "",
  takeawayUrl: "",
  canPayWithMobile: false
};

export default MobilePreview;
