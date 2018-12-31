import { Button } from "components";
import {
  MainWrapper,
  NameWrapper,
  Name,
  MostPopular,
  PriceWrapper,
  PriceDescription,
  Price
} from "./styled";
import Managers from "./managers";
import List from "./list";

const Plan = ({ t, color, name, billingPeriod }) => (
  <MainWrapper>
    <NameWrapper>
      <Name color={color}>{t(`plans.${name}.name`)}</Name>
      {name === "basic" && (
        <MostPopular color={color}>
          {t(`plans.${name}.mostPopular`)}
        </MostPopular>
      )}
      {name === "premium" && (
        <MostPopular color={color}>{t(`plans.${name}.bestValue`)}</MostPopular>
      )}
    </NameWrapper>
    <PriceWrapper>
      <PriceDescription>{t(`plans.${name}.priceDescription`)}</PriceDescription>
      {name === "basic" || name === "premium" ? (
        <Price>
          {t(`plans.${name}.price.${billingPeriod}`)}
          <small>/{t(`plans.${name}.${billingPeriod}`)}</small>
        </Price>
      ) : (
        <Price>{t(`plans.${name}.price.${billingPeriod}`)}</Price>
      )}
      <Managers {...{ color, t }} />
      <Button styleName={color}>{t(`plans.${name}.buttonText`)}</Button>
    </PriceWrapper>
    <List {...{ t, name, color }} />
  </MainWrapper>
);

export default Plan;
