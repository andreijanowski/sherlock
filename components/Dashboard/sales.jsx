import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@rebass/grid";
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
  const [comparisonPeriod, setComparisonPeriod] = useState("day");

  const onComparisonPeriodChange = useCallback(newPeriod => {
    setComparisonPeriod(newPeriod);
  }, []);

  const onHasMoreClick = useCallback(() => {
    const nextPage = page + 1;
    fetchAction(businessId, comparisonPeriod, nextPage);
    setPage(nextPage);
  }, [page, fetchAction, businessId, comparisonPeriod]);

  const hasMore = totalPages > page;

  useEffect(() => {
    if (businessId) {
      setPage(INITIAL_PAGE);
      fetchAction(businessId, comparisonPeriod, INITIAL_PAGE);
    }
  }, [fetchAction, businessId, comparisonPeriod]);

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
      <Box mb={3}>
        <TileHeader>{t(title)}</TileHeader>
      </Box>
      <Box mb={10}>
        <Dropdown
          t={t}
          value={comparisonPeriod}
          onChange={onComparisonPeriodChange}
        />
      </Box>
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
  salesList: shape(),
  businessId: string,
  totalPages: number.isRequired,
  isFetching: bool.isRequired
};

Sales.defaultProps = {
  isWorst: false,
  businessId: null,
  salesList: null
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
