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
  foodsAndDrinks,
  quirks,
  diets,
  periods,
  logo,
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
  hasCatering,
  hasPrivateEvents,
  hasReservations,
  canPayWithMobile
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
  const hasAddInfo = !!(
    (foodsAndDrinks && foodsAndDrinks.length) ||
    (quirks && quirks.length) ||
    (diets && diets.length) ||
    (michelinStars && michelinStars.length)
  );
  const hasButtons = !!(
    hasCatering ||
    hasPrivateEvents ||
    hasReservations ||
    canPayWithMobile
  );

  const additionalItems = [
    ...foodsAndDrinks,
    ...quirks,
    ...diets,
    ...michelinStars
  ].slice(0, 4);

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
            {hasAddInfo ? <MustTry>Additional Info</MustTry> : <Placeholder />}
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
              <RevealButton> See all information </RevealButton>
            ) : (
              <Placeholder />
            )}
          </RevealButtonWrapper>
        </AddInfo>
        <Media>
          <Label>
            <Placeholder />
          </Label>
          <TagsWrapper>
            {[0, 1, 2].map(el => (
              <Feature key={el}>
                <Placeholder />
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
  hasCatering: bool,
  hasPrivateEvents: bool,
  hasReservations: bool,
  canPayWithMobile: bool
};

MobilePreview.defaultProps = {
  city: "",
  cuisines: [],
  bio: "",
  foodsAndDrinks: [],
  diets: [],
  quirks: [],
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
  hasCatering: false,
  hasPrivateEvents: false,
  hasReservations: false,
  canPayWithMobile: false
};

export default MobilePreview;
