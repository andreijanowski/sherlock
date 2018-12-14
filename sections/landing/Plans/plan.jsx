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
      {name === "premium" && (
        <MostPopular color={color}>
          {t(`plans.${name}.mostPopular`)}
        </MostPopular>
      )}
    </NameWrapper>
    <PriceWrapper>
      <PriceDescription>{t(`plans.${name}.priceDescription`)}</PriceDescription>
      <Price>{t(`plans.${name}.price.${billingPeriod}`)}</Price>
      <Managers {...{ color, t }} />
      <Button styleName={color}>{t(`plans.${name}.buttonText`)}</Button>
    </PriceWrapper>
    <List {...{ t, name, color }} />
  </MainWrapper>
);

export default Plan;
