import React, { useCallback, useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Box } from "@rebass/grid";
import { string, func, number, shape, bool } from "prop-types";

import { withTranslation } from "i18n";
import {
  LoadMoreButton,
  Table,
  TableDataRow,
  TableHeadCell
} from "components/Table";
import { LoadingIndicatorWrapper, Pane } from "components/Clients/styled";
import { ExpandIconRestyled } from "components/Icons";
import { fetchBusinessPayments as fetchBusinessPaymentsAction } from "actions/payments";
import { selectCurrentBusinessId } from "selectors/business";
import {
  selectPayments,
  selectPaymentsCount,
  selectPaymentsIsFetching
} from "selectors/payments";
import { PaymentsTableRow } from "components/Payments";
import { LoadingIndicator } from "components";

const namespaces = ["ordersHistory"];

const INITIAL_PAGE = 1;

const PaymentsTable = ({
  t,
  fetchBusinessPayments,
  businessId,
  totalCount,
  payments,
  isFetching
}) => {
  const [page, setPage] = useState(INITIAL_PAGE);

  useEffect(() => {
    setPage(INITIAL_PAGE);
    fetchBusinessPayments(businessId, INITIAL_PAGE);
  }, [businessId, fetchBusinessPayments]);

  const onLoadMoreClick = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBusinessPayments(businessId, nextPage);
  }, [businessId, fetchBusinessPayments, page]);

  const hasMore = payments ? payments.size < totalCount : false;

  if (!payments) return null;

  return (
    <>
      <Pane noPadding>
        <Table>
          <thead>
            <tr>
              <TableHeadCell isCentered>ID</TableHeadCell>
              <TableHeadCell>{t("ordersHistory:table.date")}</TableHeadCell>
              <TableHeadCell>{t("ordersHistory:table.client")}</TableHeadCell>
              <TableHeadCell>{t("ordersHistory:table.amount")}</TableHeadCell>
              <TableHeadCell>{t("ordersHistory:table.currency")}</TableHeadCell>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => {
              const orderId = payment.get("id");
              return <PaymentsTableRow key={orderId} payment={payment} />;
            })}
            {hasMore && (
              <TableDataRow onClick={onLoadMoreClick}>
                <LoadMoreButton colSpan={5}>
                  <ExpandIconRestyled />
                </LoadMoreButton>
              </TableDataRow>
            )}
          </tbody>
        </Table>
      </Pane>
      {isFetching && (
        <Box my={3}>
          <LoadingIndicatorWrapper>
            <LoadingIndicator size={15} />
          </LoadingIndicatorWrapper>
        </Box>
      )}
    </>
  );
};

PaymentsTable.propTypes = {
  t: func.isRequired,
  fetchBusinessPayments: func.isRequired,
  payments: shape(),
  businessId: string,
  totalCount: number,
  isFetching: bool.isRequired
};

PaymentsTable.defaultProps = {
  businessId: null,
  payments: null,
  totalCount: 0
};

const mapState = state => ({
  businessId: selectCurrentBusinessId(state),
  payments: selectPayments(state),
  totalCount: selectPaymentsCount(state),
  isFetching: selectPaymentsIsFetching(state)
});

const mapDispatch = {
  fetchBusinessPayments: fetchBusinessPaymentsAction
};

export default compose(
  withTranslation(namespaces),
  connect(mapState, mapDispatch)
)(PaymentsTable);
