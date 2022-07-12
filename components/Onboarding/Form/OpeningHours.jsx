import React from "react";
import { shape, string, func } from "prop-types";
import { connect } from "react-redux";

import {
  postOpenPeriod,
  patchOpenPeriod,
  deleteOpenPeriod
} from "actions/openPeriods";
import { useT } from "utils/hooks";
import { Periods, parsePeriods } from "components";
import { MobilePreview } from "components/Onboarding";
import { Content, Wrapper, Title, InfoWrapper } from "./styled";

const OpeningHours = ({
  values,
  addOpenPeriod,
  removeOpenPeriod,
  updateOpenPeriod,
  businessId,
  businessOpenPeriods
}) => {
  const t = useT(["lefood", "app"]);

  const addOpenPeriodAction = openPeriod =>
    addOpenPeriod(businessId, openPeriod);

  const updateOpenPeriodAction = openPeriod =>
    updateOpenPeriod(openPeriod.id, openPeriod);

  const removeOpenPeriodAction = id => removeOpenPeriod(id);

  const initialValues = parsePeriods(businessOpenPeriods);

  // eslint-disable-next-line
  values.hasHours = !!Object.keys(initialValues).length;

  return (
    <Wrapper>
      <Title>{t("app:manageProfile.openingHours")}</Title>
      <Content>
        <InfoWrapper minWidth="706px" height="550px">
          <Periods
            {...{
              t,
              initialValues,
              isLocationVisible: false,
              addPeriod: addOpenPeriodAction,
              updatePeriod: updateOpenPeriodAction,
              removePeriod: removeOpenPeriodAction,
              currentPage: "",
              hasHiddenTitle: true,
              padding: "0"
            }}
          />
        </InfoWrapper>
        <MobilePreview {...initialValues} {...values} />
      </Content>
    </Wrapper>
  );
};

OpeningHours.propTypes = {
  addOpenPeriod: func.isRequired,
  updateOpenPeriod: func.isRequired,
  removeOpenPeriod: func.isRequired,
  businessId: string,
  businessOpenPeriods: shape(),
  values: shape().isRequired
};

OpeningHours.defaultProps = {
  businessId: "",
  businessOpenPeriods: null
};

export default connect(
  state => {
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business =
      businessData &&
      businessData.get("businesses") &&
      businessData.get("businesses").first();
    return {
      businessId: business && business.get("id"),
      businessOpenPeriods: businessData && businessData.get("openPeriods")
    };
  },
  {
    addOpenPeriod: postOpenPeriod,
    updateOpenPeriod: patchOpenPeriod,
    removeOpenPeriod: deleteOpenPeriod
  }
)(OpeningHours);
