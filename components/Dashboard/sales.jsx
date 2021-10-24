import React, { useCallback, useEffect, useState } from "react";
import { Flex } from "@rebass/grid";
import { bool, func, number, shape, string } from "prop-types";
import { connect } from "react-redux";

import { selectCurrentBusinessId } from "selectors/business";
import {
  selectBestSalesData,
  selectBestSalesTotalPagesData,
  selectDashboardIsFetching,
  selectWorstSalesData,
  selectWorstSalesTotalPagesData
} from "selectors/dashboard";
import { ChevronDown } from "components/Icons";
import {
  ChevronWrapper,
  EmptyData,
  SalesList,
  Spacer,
  Tile,
  TileHeader
} from "./styled";
import Loader from "./loader";
import SalesItem from "./SalesItem";
import Dropdown from "./dropdown";

const INITIAL_PAGE = 1;

const Sales = ({
  isWorst,
  fetchAction,
  businessId,
  title,
  salesList,
  totalPages,
  isFetching,
  t
}) => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [comparisonPeriod, setComparisonPeriod] = useState("yesterday");

  const onComparisonPeriodChange = useCallback(newPeriod => {
    setComparisonPeriod(newPeriod);
  }, []);

  const onHasMoreClick = useCallback(() => {
    const nextPage = page + 1;
    fetchAction(businessId, nextPage);
    setPage(nextPage);
  }, [page, fetchAction, businessId]);

  const hasMore = totalPages > page;

  useEffect(() => {
    if (businessId) {
      setPage(INITIAL_PAGE);
      fetchAction(businessId, INITIAL_PAGE);
    }
  }, [fetchAction, businessId]);

  const render = content => (
    <Tile height="314" width={1}>
      {content}
    </Tile>
  );

  if (!salesList && isFetching) {
    return render(<Loader />);
  }

  return render(
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <TileHeader>{t(title)}</TileHeader>
        <Dropdown
          t={t}
          value={comparisonPeriod}
          onChange={onComparisonPeriodChange}
          withToday
        />
      </Flex>
      <Spacer />
      <SalesList>
        {salesList && salesList.size ? (
          salesList.map((item, index) => (
            <SalesItem
              t={t}
              key={item.get("id")}
              index={index}
              item={item}
              isWorst={isWorst}
              comparisonPeriod={comparisonPeriod}
            />
          ))
        ) : (
          <EmptyData>{t("noData")}</EmptyData>
        )}
      </SalesList>
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

Sales.propTypes = {
  isWorst: bool,
  title: string.isRequired,
  t: func.isRequired,
  fetchAction: func.isRequired,
  salesList: shape({
    percentage: string.isRequired,
    ordered: string.isRequired,
    name: string.isRequired
  }).isRequired,
  businessId: string,
  totalPages: number.isRequired,
  isFetching: bool.isRequired
};

Sales.defaultProps = {
  isWorst: false,
  businessId: null
};

const mapState = (state, { isWorst }) => ({
  businessId: selectCurrentBusinessId(state),
  salesList: isWorst ? selectWorstSalesData(state) : selectBestSalesData(state),
  totalPages: isWorst
    ? selectWorstSalesTotalPagesData(state)
    : selectBestSalesTotalPagesData(state),
  isFetching: selectDashboardIsFetching(state)
});

export default connect(mapState)(Sales);
