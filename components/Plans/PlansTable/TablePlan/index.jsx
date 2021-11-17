import React, { useCallback } from "react";
import { string, shape, func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Flex, Box } from "@rebass/grid";

import { useTranslation } from "i18n";
import { getPlanData } from "utils/plans";
import {
  PlanContainer,
  PlanLabel,
  PlanMostPopular,
  PlanMostPopularLabel,
  PlanMostPopularIcon,
  PlanPrice,
  PlanPeriod,
  PlansButton
} from "./styled";
import { Cell } from "../styled";

const TablePlan = ({ plan, period, onPlanChooseClick }) => {
  const { t } = useTranslation();
  const { label, price, buttonLabel, color, isPopular } = getPlanData({
    plan,
    t
  });

  const onButtonClick = useCallback(() => {
    onPlanChooseClick(plan);
  }, [onPlanChooseClick, plan]);

  return (
    <Cell>
      <PlanContainer>
        <Flex pt={12} alignItems="flex-start">
          <PlanLabel color={color}>{label}</PlanLabel>
          {isPopular && (
            <PlanMostPopular ml="3px" mt={-12}>
              <PlanMostPopularIcon>
                <FontAwesomeIcon size="xs" icon={faStar} />
              </PlanMostPopularIcon>
              <PlanMostPopularLabel>
                {t("plans:mostPopular")}
              </PlanMostPopularLabel>
            </PlanMostPopular>
          )}
        </Flex>
        <Flex mt="2px" flexWrap="nowrap" alignItems="flex-end">
          <PlanPrice color={color}>{price}</PlanPrice>
          <PlanPeriod ml={2}>
            / {t(`plans:billingPerPeriod.${period}`)}
          </PlanPeriod>
        </Flex>
        <Box mt="21px" mb="10px">
          <PlansButton onClick={onButtonClick} color={color}>
            {buttonLabel}
          </PlansButton>
        </Box>
      </PlanContainer>
    </Cell>
  );
};
TablePlan.propTypes = {
  period: string.isRequired,
  plan: shape().isRequired,
  onPlanChooseClick: func.isRequired
};

export default TablePlan;
