import { func, string, bool } from "prop-types";
import { Button } from "components";
import {
  MainWrapper,
  NameWrapper,
  Name,
  MostPopular,
  PriceWrapper,
  PriceDescription,
  Price,
  BetaPrice,
  RegularPrice
} from "./styled";
import List from "./list";

const Plan = ({
  t,
  color,
  name,
  billingInterval,
  onClickActionButton,
  nextPlanName,
  currentPlanInterval,
  isSubscriptionView
}) => {
  const isChosen =
    nextPlanName === name &&
    (currentPlanInterval === billingInterval || nextPlanName === "essential");
  let buttonText = t(`plans:${name}.buttonText`);
  if (isChosen) {
    buttonText = t(`plans:chosen`);
  } else if (nextPlanName !== null && name !== "professional") {
    buttonText = t(`plans:choose`);
  }
  return (
    <MainWrapper>
      <NameWrapper>
        <Name color={color}>{t(`plans:${name}.name`)}</Name>
        {name === "basic" && (
          <>
            <MostPopular color={color}>
              {t(`plans:${name}.mostPopular`)}
            </MostPopular>
          </>
        )}
        {name === "premium" && (
          <>
            <MostPopular color={color}>
              {t(`plans:${name}.bestValue`)}
            </MostPopular>
          </>
        )}
      </NameWrapper>
      <PriceWrapper>
        <PriceDescription>
          {t(`plans:${name}.priceDescription`)}
        </PriceDescription>
        {name === "basic" || name === "premium" ? (
          <>
            {billingInterval === "year" ? (
              <>
                <RegularPrice>
                  {t(`plans:${name}.price.${billingInterval}`)}
                  <small>/{t(`plans:${name}.${billingInterval}`)}</small>
                </RegularPrice>
                <BetaPrice>
                  {t(`plans:${name}.price.beta`)}
                  <small>/{t(`plans:${name}.${billingInterval}`)}</small>
                </BetaPrice>
              </>
            ) : (
              <Price>
                {t(`plans:${name}.price.${billingInterval}`)}
                <small>/{t(`plans:${name}.${billingInterval}`)}</small>
              </Price>
            )}
          </>
        ) : (
          <Price>{t(`plans:${name}.price.${billingInterval}`)}</Price>
        )}
        <Button
          onClick={onClickActionButton}
          styleName={isChosen ? "background" : color}
        >
          {buttonText}
          {(name === "premium" || name === "basic") &&
            !isSubscriptionView &&
            t(
              `plans:${name}.price.${
                billingInterval === "year" ? "beta" : billingInterval
              }`
            )}
        </Button>
      </PriceWrapper>
      <List {...{ t, name, color }} />
    </MainWrapper>
  );
};

Plan.propTypes = {
  t: func.isRequired,
  billingInterval: string.isRequired,
  color: string.isRequired,
  name: string.isRequired,
  onClickActionButton: func.isRequired,
  nextPlanName: string,
  currentPlanInterval: string,
  isSubscriptionView: bool.isRequired
};

Plan.defaultProps = {
  nextPlanName: null,
  currentPlanInterval: null
};

export default Plan;
