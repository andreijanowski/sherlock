import React, { useMemo } from "react";
import { string, func } from "prop-types";

import { useTranslation } from "i18n";
import { SUBSCRIPTION_CURRENCY } from "consts";
import GroupSelector from "components/GroupSelector";

const PlansCurrencySelector = ({ currency, setCurrency }) => {
  const { t } = useTranslation();

  const options = useMemo(
    () =>
      Object.values(SUBSCRIPTION_CURRENCY).map(currencyName => ({
        value: currencyName,
        label: t(`plans:currency.${currencyName}`)
      })),
    [t]
  );

  return (
    <GroupSelector
      value={currency}
      setValue={setCurrency}
      label={t("plans:currency.title")}
      options={options}
    />
  );
};

PlansCurrencySelector.propTypes = {
  currency: string.isRequired,
  setCurrency: func.isRequired
};

export default PlansCurrencySelector;
