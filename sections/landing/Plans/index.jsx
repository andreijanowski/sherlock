import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { shape, func, string } from "prop-types";
import { Box, Flex } from "@rebass/grid";

import { fetchPlans as fetchPlansAction } from "actions/plans";
import { selectPlans } from "selectors/plans";
import { SUBSCRIPTION_CURRENCY, SUBSCRIPTION_PERIOD } from "consts";
import { useTranslation } from "i18n";
import PlansTable from "components/Plans/PlansTable";
import PlansPeriodSelector from "components/Plans/PlansPeriodSelector";
import PlansCurrencySelector from "components/Plans/PlansCurrencySelector";
import { getPlanData, getPlanLoginPath } from "utils/plans";
import {
  PlansContainer,
  H2Styled,
  ParagraphStyled,
  TextWrapper
} from "./styled";
import { BlueText } from "../sharedStyled";

const Plans = ({ plans, fetchPlans, lng }) => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState(SUBSCRIPTION_PERIOD.MONTHLY);
  const [currency, setCurrency] = useState(SUBSCRIPTION_CURRENCY.EUR);

  const onPlanChooseClick = useCallback(
    plan => {
      const { name } = getPlanData({ plan, t });
      window.location.href = getPlanLoginPath({ lng, name });
    },
    [lng, t]
  );

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  if (!plans || !plans.size) return null;

  return (
    <PlansContainer>
      <TextWrapper>
        <Flex
          flexWrap="wrap"
          flexDirection={["column", "column", "column", "row"]}
          justifyContent={["center", "center", "center", "space-between"]}
          alignItems="flex-end"
          mb="60px"
        >
          <Box width={[1, 1, 1, 2 / 5]} mb={[30, 30, 30, 0]}>
            <H2Styled>{t("plans:header")}</H2Styled>
            <ParagraphStyled big>
              {t("plans:subHeader.start")}{" "}
              <BlueText>{t("plans:subHeader.end")}</BlueText>
            </ParagraphStyled>
            <ParagraphStyled>{t("plans:paragraph")}</ParagraphStyled>
          </Box>
          <Box width={[1, 1, 1, 2 / 5]}>
            <Box mb={20}>
              <PlansPeriodSelector period={period} setPeriod={setPeriod} />
            </Box>
            <PlansCurrencySelector
              currency={currency}
              setCurrency={setCurrency}
            />
          </Box>
        </Flex>
      </TextWrapper>
      <PlansTable
        plans={plans}
        period={period}
        currency={currency}
        onPlanChooseClick={onPlanChooseClick}
      />
    </PlansContainer>
  );
};

Plans.propTypes = {
  plans: shape(),
  lng: string.isRequired,
  fetchPlans: func.isRequired
};

Plans.defaultProps = {
  plans: null
};

const mapState = state => ({
  plans: selectPlans(state)
});

const mapDispatch = {
  fetchPlans: fetchPlansAction
};

export default connect(
  mapState,
  mapDispatch
)(Plans);
