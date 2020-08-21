import { func, string, bool } from "prop-types";
import { Button } from "components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MainWrapper,
  Name,
  PriceWrapper,
  PriceDescription,
  Price,
  Billing
} from "./styled";
import List from "./list";

const Plan = ({
  t,
  color,
  name,
  billingInterval,
  isSubscriptionView,
  onClickActionButton,
  nextPlanName,
  currentPlanInterval
}) => {
  const isChosen =
    nextPlanName === name &&
    (currentPlanInterval === billingInterval || nextPlanName === "essential");
  let buttonText = t(`plans:${name}.buttonText`);
  if (isChosen) {
    buttonText = t(`plans:chosen`);
  } else if (nextPlanName !== null) {
    buttonText = t(`plans:choose`);
  }

  return (
    <MainWrapper>
      <Name color={color} justifyContent={["center", "flex-start"]}>
        {t(`plans:${name}.name`)}
      </Name>
      <PriceWrapper>
        <PriceDescription>
          {t(`plans:${name}.priceDescription`)}
        </PriceDescription>
        {name === "basic" || name === "special" ? (
          <Price>{t(`plans:${name}.price.beta`)}</Price>
        ) : (
          <Price>
            &euro;{t(`plans:${name}.price.${billingInterval}`)}
            <Billing>/{billingInterval}</Billing>
          </Price>
        )}
      </PriceWrapper>
      <Flex
        alignItems="center"
        justifyContent={["center", "flex-start"]}
        mx={[0, -3]}
      >
        <Button onClick={onClickActionButton} styleName="signUpCTA">
          {buttonText}
          {name === "basic" &&
            !isSubscriptionView &&
            t(
              `plans:${name}.price.${
                billingInterval === "year" ? "beta" : billingInterval
              }`
            )}
          <FontAwesomeIcon
            icon={["fa", "chevron-right"]}
            style={{ marginLeft: 12 }}
          />
        </Button>
      </Flex>
      <Box mt={5}>
        <List {...{ t, name }} />
      </Box>
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
