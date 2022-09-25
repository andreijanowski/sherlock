import { useEffect, useState } from "react";
import { func, string, shape, bool } from "prop-types";
import { connect } from "react-redux";
import { LoadingIndicator } from "components";
import { getIntelligenceNotifications } from "actions/intelligence";
import {
  selectIntelligence,
  selectIntelligenceCount,
  selectIntelligenceIsFetching
} from "selectors/intelligence";
import { GridWrapper } from "./styled";

import IntelligenceTile from "../../components/IntelligenceTile";

const INITIAL_PAGE = 1;

const IntelligenceSection = ({
  t,
  fetchIntelligenceNotifications,
  isFetching,
  intelligenceData,
  businessId
}) => {
  const [, setPage] = useState(INITIAL_PAGE);
  useEffect(() => {
    setPage(INITIAL_PAGE);
    if (businessId) {
      fetchIntelligenceNotifications({
        businessId,
        INITIAL_PAGE
      });
    }
  }, [businessId, fetchIntelligenceNotifications]);

  if (!intelligenceData) return null;

  return (
    <GridWrapper justifyContent="flex-start">
      {isFetching ? (
        <LoadingIndicator />
      ) : (
        <>
          {intelligenceData.map(intelligence => {
            const id = intelligence.get("id");
            return <IntelligenceTile key={id} data={intelligence} t={t} />;
          })}
        </>
      )}
    </GridWrapper>
  );
};

IntelligenceSection.propTypes = {
  t: func.isRequired,
  fetchIntelligenceNotifications: func.isRequired,
  intelligenceData: shape(),
  businessId: string.isRequired,
  // totalCount: number,
  isFetching: bool.isRequired
};

IntelligenceSection.defaultProps = {
  intelligenceData: null
  // totalCount: 0
};

const mapState = state => ({
  intelligenceData: selectIntelligence(state),
  totalCount: selectIntelligenceCount(state),
  isFetching: selectIntelligenceIsFetching(state)
});

const mapDispatch = {
  fetchIntelligenceNotifications: getIntelligenceNotifications
};

export default connect(mapState, mapDispatch)(IntelligenceSection);
