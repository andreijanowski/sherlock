import { SUBSCRIPTION_PERIOD } from "consts";
import { noop } from "lodash";
import { func, string, shape } from "prop-types";
import React, { useMemo } from "react";
import { heads, planParts } from "./config";
import PlanHead from "./PlanHead";
import PlanPart from "./PlanPart";
import { Description, DescriptionInner, Explain, Table, Wrap } from "./styled";

const PlansTable = ({ interval, t, onPlanChoose, plans }) => {
  const memoizedHeads = useMemo(
    () =>
      heads({
        isMonth: interval === SUBSCRIPTION_PERIOD.MONTH,
        t,
        plans
      }),
    [interval, plans, t]
  );

  return (
    <>
      <Wrap>
        <Table>
          <thead>
            <tr>
              <th colSpan="2">
                {t("plans:tableHd1")},
                <br />
                {t("plans:tableHd2")}
              </th>
              {memoizedHeads.map(
                ({ button, color, description, label, price }) => (
                  <th key={label}>
                    <PlanHead
                      button={button}
                      color={color}
                      label={label}
                      price={price}
                      onBtnClick={onPlanChoose}
                    />
                    {description && (
                      <Description>
                        <DescriptionInner>{description}</DescriptionInner>
                      </Description>
                    )}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {planParts({ t }).map(({ heading, items }) => (
              <PlanPart heading={heading} items={items} key={heading} />
            ))}
          </tbody>
        </Table>
      </Wrap>
      <Explain>{t("plans:tableStar")}</Explain>
    </>
  );
};

PlansTable.defaultProps = {
  interval: "",
  t: noop,
  onPlanChoose: noop,
  plans: null
};
PlansTable.propTypes = {
  interval: string,
  t: func,
  onPlanChoose: func,
  plans: shape()
};

export default PlansTable;
