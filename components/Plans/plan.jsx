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
import List from "./list";

const Plan = ({
  t,
  color,
  name,
  billingInterval,
  onClickActionButton,
  currentPlanName,
  currentPlanInterval
}) => {
  const isChoosed =
    currentPlanName === name &&
    (currentPlanInterval === billingInterval ||
      currentPlanName === "essential");
  let buttonText = t(`plans:${name}.buttonText`);
  if (isChoosed) {
    buttonText = t(`plans:yourCurrentPlan`);
  } else if (currentPlanName !== null && name !== "professional") {
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
            <MostPopular color="ruby">
              {t(`plans:${name}.promoPrice`)}
            </MostPopular>
          </>
        )}
        {name === "premium" && (
          <>
            <MostPopular color={color}>
              {t(`plans:${name}.bestValue`)}
            </MostPopular>
            <MostPopular color="ruby">
              {t(`plans:${name}.promoPrice`)}
            </MostPopular>
          </>
        )}
      </NameWrapper>
      <PriceWrapper>
        <PriceDescription>
          {t(`plans:${name}.priceDescription`)}
        </PriceDescription>
        {name === "basic" || name === "premium" ? (
          <Price>
            {t(`plans:${name}.price.${billingInterval}`)}
            <small>/{t(`plans:${name}.${billingInterval}`)}</small>
          </Price>
        ) : (
          <Price>{t(`plans:${name}.price.${billingInterval}`)}</Price>
        )}
        <Button
          onClick={onClickActionButton}
          styleName={isChoosed ? "background" : color}
        >
          {buttonText}
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
  currentPlanName: string,
  currentPlanInterval: string
};

Plan.defaultProps = {
  currentPlanName: null,
  currentPlanInterval: null
};

export default Plan;
