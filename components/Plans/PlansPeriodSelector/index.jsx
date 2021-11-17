import React, { useMemo } from "react";
import { string, func } from "prop-types";

import { useTranslation } from "i18n";
import { SUBSCRIPTION_PERIOD } from "consts";
import GroupSelector from "components/GroupSelector";

const PlansPeriodSelector = ({ period, setPeriod }) => {
  const { t } = useTranslation();

  const options = useMemo(
    () =>
      Object.values(SUBSCRIPTION_PERIOD).map(periodName => ({
        value: periodName,
        label: t(`plans:billing.${periodName}`),
        caption:
          periodName === SUBSCRIPTION_PERIOD.YEARLY
            ? ` - ${t("plans:billing.save")}`
            : null
      })),
    [t]
  );

  return (
    <GroupSelector
      value={period}
      setValue={setPeriod}
      label={t("plans:billing.title")}
      options={options}
    />
  );
};

PlansPeriodSelector.propTypes = {
  period: string.isRequired,
  setPeriod: func.isRequired
};

export default PlansPeriodSelector;
