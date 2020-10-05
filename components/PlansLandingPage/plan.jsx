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
  MostPopular,
  Billing,
  NameWrapper
} from "./styled";
import List from "./list";

const Plan = ({
  t,
  color,
  name,
  billingInterval,
  onClickActionButton,
  nextPlanName,
  isCanceled
}) => {
  const isBasicAndCanceled = isCanceled && name === "basic";
  const shouldShowPlanPrice = name === "essential" || name === "premium";
  const isChosen = nextPlanName === name;
  let buttonText = t(`plans:${name}.buttonText`);
  if (isChosen) {
    buttonText = t(`plans:chosen`);
  } else if (nextPlanName !== null) {
    buttonText = t(`plans:choose`);
  }

  return (
    <MainWrapper>
      <NameWrapper>
        <Name
          color={color}
          justifyContent={["center", "flex-start"]}
          mb={[0, 20]}
        >
          <p>{t(`plans:${name}.name`)}</p>
          {name === "essential" && (
            <>
              <MostPopular color={color}>
                {t(`plans:${name}.mostPopular`)}
              </MostPopular>
            </>
          )}
        </Name>
      </NameWrapper>

      <PriceWrapper special={name === "special"}>
        <PriceDescription mt={[0, 20]}>
          {t(`plans:${name}.priceDescription`)}
        </PriceDescription>
        {name === "basic" || name === "special" ? (
          <Price>{t(`plans:${name}.price.beta`)}</Price>
        ) : (
          <Price>
            &euro;{t(`plans:${name}.price.${billingInterval}`)}
            <Billing>/{t(`plans:${name}.${billingInterval}`)}</Billing>
          </Price>
        )}
      </PriceWrapper>
      <Flex
        alignItems="center"
        justifyContent={["center", "flex-start"]}
        mx={[0, -3]}
      >
        <Button
          onClick={onClickActionButton}
          disabled={isBasicAndCanceled}
          styleName="signUpCTA"
        >
          {buttonText}
          {shouldShowPlanPrice && (
            <> &euro;{t(`plans:${name}.price.${billingInterval}`)} </>
          )}
          <FontAwesomeIcon
            icon={["fa", "chevron-right"]}
            style={{ marginLeft: 12 }}
          />
        </Button>
      </Flex>
      {name !== "special" && (
        <Box mt={[1, 5]}>
          <List {...{ t, name, color }} />
        </Box>
      )}
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
  isSubscriptionView: bool.isRequired,
  isCanceled: bool
};

Plan.defaultProps = {
  nextPlanName: null,
  currentPlanInterval: null,
  isCanceled: false
};

export default Plan;
