import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bool, func, number, shape, string } from "prop-types";
import { action as toggleMenuAction } from "redux-burger-menu/immutable";

import { selectCurrentBusinessId } from "selectors/business";
import { fetchLiveStream as fetchLiveStreamAction } from "actions/businesses";
import {
  selectDashboardIsFetching,
  selectLiveStreamData,
  selectLiveStreamTotalPagesData
} from "selectors/dashboard";
import OrderDetails from "sections/lefood/orders/OrderDetails";
import {
  patchOrder as patchOrderAction,
  patchOrderReject as patchOrderRejectAction
} from "actions/orders";
import RejectModal from "sections/lefood/orders/RejectModal";
import { getRejectOrderPayload } from "utils/orderUtils";
import {
  OrderDetailsContainer,
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
  isFetching,
  toggleMenu,
  updateOrder,
  rejectOrder
}) => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isRejectionModalVisible, setRejectionModalVisible] = useState(null);

  const hasMore = totalPages > page;

  const onHasMoreClick = useCallback(() => {
    const nextPage = page + 1;
    fetchLiveStream(businessId, nextPage);
    setPage(nextPage);
  }, [page, fetchLiveStream, businessId]);

  const onItemClick = useCallback(
    order => {
      setOrderDetails(order);
      toggleMenu(true);
    },
    [toggleMenu]
  );

  const reloadInitialData = useCallback(() => {
    setPage(INITIAL_PAGE);
    fetchLiveStream(businessId, INITIAL_PAGE);
  }, [businessId, fetchLiveStream]);

  const onUpdateOrder = useCallback(
    async state => {
      await updateOrder({ state }, orderDetails.get("id"));
      setOrderDetails(prevDetails =>
        prevDetails.setIn(["attributes", "state"], state)
      );
      reloadInitialData();
    },
    [orderDetails, reloadInitialData, updateOrder]
  );

  const showRejectModal = useCallback(() => {
    toggleMenu(false);
    setRejectionModalVisible(true);
  }, [toggleMenu]);

  const onRejectModalClose = useCallback(() => {
    setRejectionModalVisible(false);
    toggleMenu(true);
  }, [toggleMenu]);

  const onRejectModalSubmit = useCallback(
    async ({ rejectReason, unavailableElements, otherRejectionReason }) => {
      const orderId = orderDetails.get("id");

      await rejectOrder(
        getRejectOrderPayload({
          rejectReason,
          unavailableElements,
          otherRejectionReason,
          orderDetails
        }),
        orderId
      );
      setRejectionModalVisible(false);
      reloadInitialData();
    },
    [orderDetails, rejectOrder, reloadInitialData]
  );

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
            <StreamItem
              key={item.get("id")}
              t={t}
              item={item}
              onItemClick={onItemClick}
            />
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
      <OrderDetailsContainer>
        <OrderDetails
          {...{
            orderDetails,
            updateOrder: onUpdateOrder,
            setRejectModalVisibility: showRejectModal
          }}
        />
      </OrderDetailsContainer>
      <RejectModal
        {...{
          isOpen: isRejectionModalVisible,
          onClose: onRejectModalClose,
          pendingRejectionOrder: orderDetails,
          handleRejectionSubmit: onRejectModalSubmit
        }}
      />
    </>
  );
};

Stream.propTypes = {
  t: func.isRequired,
  businessId: string,
  fetchLiveStream: func.isRequired,
  updateOrder: func.isRequired,
  rejectOrder: func.isRequired,
  toggleMenu: func.isRequired,
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
  updateOrder: patchOrderAction,
  fetchLiveStream: fetchLiveStreamAction,
  toggleMenu: toggleMenuAction,
  rejectOrder: patchOrderRejectAction
};

export default connect(
  mapState,
  mapDispatch
)(Stream);
