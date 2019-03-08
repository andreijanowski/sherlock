import { func, string } from "prop-types";
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

const Plan = ({ t, color, name, billingPeriod, onClickActionButton }) => (
  <MainWrapper>
    <NameWrapper>
      <Name color={color}>{t(`plans.${name}.name`)}</Name>
      {name === "basic" && (
        <>
          <MostPopular color={color}>
            {t(`plans.${name}.mostPopular`)}
          </MostPopular>
          <MostPopular color="ruby">
            {t(`plans.${name}.promoPrice`)}
          </MostPopular>
        </>
      )}
      {name === "premium" && (
        <>
          <MostPopular color={color}>
            {t(`plans.${name}.bestValue`)}
          </MostPopular>
          <MostPopular color="ruby">
            {t(`plans.${name}.promoPrice`)}
          </MostPopular>
        </>
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
      <Button onClick={onClickActionButton} styleName={color}>
        {t(`plans.${name}.buttonText`)}
      </Button>
    </PriceWrapper>
    <List {...{ t, name, color }} />
  </MainWrapper>
);

Plan.propTypes = {
  t: func.isRequired,
  billingPeriod: string.isRequired,
  color: string.isRequired,
  name: string.isRequired,
  onClickActionButton: func.isRequired
};

export default Plan;
