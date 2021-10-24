import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bool, func, number, shape, string } from "prop-types";

import { selectCurrentBusinessId } from "selectors/business";
import { fetchLiveStream as fetchLiveStreamAction } from "actions/businesses";
import {
  selectDashboardIsFetching,
  selectLiveStreamData,
  selectLiveStreamTotalPagesData
} from "selectors/dashboard";
import {
  ChevronWrapper,
  EmptyData,
  Spacer,
  StreamHeader,
  StreamList,
  Tile,
  TileHeader
} from "./styled";
import { ChevronDown } from "../Icons";
import Loader from "./loader";
import StreamItem from "./StreamItem";

const INITIAL_PAGE = 1;

const Stream = ({
  t,
  businessId,
  fetchLiveStream,
  streamList,
  totalPages,
  isFetching
}) => {
  const [page, setPage] = useState(INITIAL_PAGE);

  const hasMore = totalPages > page;

  const onHasMoreClick = useCallback(() => {
    const nextPage = page + 1;
    fetchLiveStream(businessId, nextPage);
    setPage(nextPage);
  }, [page, fetchLiveStream, businessId]);

  useEffect(() => {
    if (businessId) {
      setPage(INITIAL_PAGE);
      fetchLiveStream(businessId, INITIAL_PAGE);
    }
  }, [businessId, fetchLiveStream]);

  const render = content => (
    <Tile height="645" width={1}>
      {content}
    </Tile>
  );

  if (!streamList && isFetching) {
    return render(<Loader />);
  }

  return render(
    <>
      <StreamHeader alignItems="center" justifyContent="space-between">
        <TileHeader>{t("liveStream")}</TileHeader>
      </StreamHeader>
      <Spacer />
      <StreamList>
        {streamList && streamList.size ? (
          streamList.map(item => (
            <StreamItem key={item.get("id")} t={t} item={item} />
          ))
        ) : (
          <EmptyData>{t("noData")}</EmptyData>
        )}
      </StreamList>
      {isFetching && <Loader />}
      {hasMore && (
        <ChevronWrapper
          onClick={onHasMoreClick}
          alignItems="center"
          justifyContent="center"
          width={1}
        >
          <ChevronDown />
        </ChevronWrapper>
      )}
    </>
  );
};

Stream.propTypes = {
  t: func.isRequired,
  businessId: string,
  fetchLiveStream: func.isRequired,
  streamList: shape(),
  totalPages: number.isRequired,
  isFetching: bool.isRequired
};

Stream.defaultProps = {
  streamList: null,
  businessId: null
};

const mapState = state => ({
  businessId: selectCurrentBusinessId(state),
  streamList: selectLiveStreamData(state),
  totalPages: selectLiveStreamTotalPagesData(state),
  isFetching: selectDashboardIsFetching(state)
});

const mapDispatch = {
  fetchLiveStream: fetchLiveStreamAction
};

export default connect(
  mapState,
  mapDispatch
)(Stream);
