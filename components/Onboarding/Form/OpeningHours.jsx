import React from "react";
import { shape, string, func } from "prop-types";
import { connect } from "react-redux";

import {
  postOpenPeriod,
  patchOpenPeriod,
  deleteOpenPeriod
} from "actions/openPeriods";
import { useT } from "utils/hooks";
import { Periods } from "components";
import { MobilePreview } from "components/Onboarding";
import { Content, Wrapper, Title, InfoWrapper, FormWrapper } from "./styled";

const OpeningHours = ({
  values: initialValues,
  addOpenPeriod,
  removeOpenPeriod,
  updateOpenPeriod,
  businessId
}) => {
  const t = useT(["lefood", "app"]);

  const addOpenPeriodAction = openPeriod =>
    addOpenPeriod(businessId, openPeriod);

  const updateOpenPeriodAction = openPeriod =>
    updateOpenPeriod(openPeriod.id, openPeriod);

  const removeOpenPeriodAction = id => removeOpenPeriod(id);

  return (
    <FormWrapper>
      <Wrapper>
        <Title>{t("app:manageProfile.openingHours")}</Title>
        <Content>
          <InfoWrapper minWidth="800px" height="570px">
            <Periods
              {...{
                t,
                initialValues: initialValues.periods,
                isLocationVisible: false,
                addPeriod: addOpenPeriodAction,
                updatePeriod: updateOpenPeriodAction,
                removePeriod: removeOpenPeriodAction,
                currentPage: "",
                hasHiddenTitle: true,
                padding: "0",
                hasHiddenMessages: true
              }}
            />
          </InfoWrapper>
          <MobilePreview {...initialValues} />
        </Content>
      </Wrapper>
    </FormWrapper>
  );
};

OpeningHours.propTypes = {
  addOpenPeriod: func.isRequired,
  updateOpenPeriod: func.isRequired,
  removeOpenPeriod: func.isRequired,
  businessId: string,
  values: shape().isRequired
};

OpeningHours.defaultProps = {
  businessId: ""
};

export default connect(
  null,
  {
    addOpenPeriod: postOpenPeriod,
    updateOpenPeriod: patchOpenPeriod,
    removeOpenPeriod: deleteOpenPeriod
  }
)(OpeningHours);
