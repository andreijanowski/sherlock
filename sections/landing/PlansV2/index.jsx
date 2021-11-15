import React, { useEffect } from "react";
import { connect } from "react-redux";
import { shape, func } from "prop-types";

import { fetchPlans as fetchPlansAction } from "actions/plans";
import { selectPlans } from "selectors/plans";
import PlansTable from "components/PlansTable";
import { PlansContainer } from "./styled";

const PlansV2 = ({ plans, fetchPlans }) => {
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  if (!plans) return null;

  return (
    <PlansContainer>
      <PlansTable />
    </PlansContainer>
  );
};

PlansV2.propTypes = {
  plans: shape(),
  fetchPlans: func.isRequired
};

PlansV2.defaultProps = {
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
)(PlansV2);
