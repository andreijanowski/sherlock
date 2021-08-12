import React from "react";
import { func, number, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";

import { TotalClientsCount, TotalClientsLabel } from "./styled";
import Search from "./Search";
import { Pane } from "../styled";

const ClientsFilter = ({
  t,
  totalCount,
  onSearchUpdate,
  currentBusinessId
}) => (
  <Pane justifyContent="space-between" alignItems="center" mb={4}>
    <Flex alignItems="center">
      <Box mr="4">
        <TotalClientsCount>{totalCount}</TotalClientsCount>
      </Box>
      <TotalClientsLabel>{t("clients:total")}</TotalClientsLabel>
    </Flex>
    <Search
      t={t}
      onSearchUpdate={onSearchUpdate}
      currentBusinessId={currentBusinessId}
    />
  </Pane>
);

ClientsFilter.propTypes = {
  t: func.isRequired,
  onSearchUpdate: func.isRequired,
  totalCount: number.isRequired,
  currentBusinessId: string
};

ClientsFilter.defaultProps = {
  currentBusinessId: null
};

export default ClientsFilter;
