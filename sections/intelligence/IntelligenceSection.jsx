import { useEffect, useState, useCallback } from "react";
import { func, string, shape, bool, number } from "prop-types";
import { connect } from "react-redux";
import {
  LoadingIndicator,
  IntelligenceTile,
  IntelligenceFilter
} from "components";
import { getIntelligenceNotifications } from "actions/intelligence";
import {
  selectIntelligence,
  selectIntelligenceCount,
  selectIntelligenceIsFetching
} from "selectors/intelligence";
import { debounce } from "lodash";
import { GridWrapper } from "./styled";

// NB The this will be uncommented next sprint when the backend features are added.

const INITIAL_PAGE = 1;
const INITIAL_SEARCH = "";
const INPUT_DELAY = 300;

const IntelligenceSection = ({
  t,
  fetchIntelligenceNotifications,
  isFetching,
  intelligenceData,
  businessId,
  totalCount
}) => {
  const [, setPage] = useState(INITIAL_PAGE);
  const [, setSearch] = useState(INITIAL_SEARCH);

  useEffect(() => {
    setPage(INITIAL_PAGE);
    if (businessId) {
      fetchIntelligenceNotifications({
        businessId,
        INITIAL_PAGE
      });
    }
  }, [businessId, fetchIntelligenceNotifications]);

  const onSearchUpdate = useCallback(
    debounce(newSearch => {
      setPage(INITIAL_PAGE);
      setSearch(newSearch);
    }, INPUT_DELAY),
    [businessId]
  );

  if (!intelligenceData) return null;

  return (
    <>
      <IntelligenceFilter
        t={t}
        totalCount={totalCount}
        onSearchUpdate={onSearchUpdate}
        currentBusinessId={businessId}
      />
      <GridWrapper justifyContent="flex-start" id="intelligence-section">
        {isFetching ? (
          <LoadingIndicator />
        ) : (
          <>
            {intelligenceData.toArray().map(intelligence => {
              const id = intelligence.get("id");
              return <IntelligenceTile key={id} data={intelligence} t={t} />;
            })}
          </>
        )}
      </GridWrapper>
    </>
  );
};

IntelligenceSection.propTypes = {
  t: func.isRequired,
  fetchIntelligenceNotifications: func.isRequired,
  intelligenceData: shape(),
  businessId: string.isRequired,
  totalCount: number,
  isFetching: bool.isRequired
};

IntelligenceSection.defaultProps = {
  intelligenceData: null,
  totalCount: 0
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
