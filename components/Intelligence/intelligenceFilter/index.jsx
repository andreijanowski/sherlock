import React from "react";
import { func, number, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { TotalClientsCount, TotalClientsLabel, Pane } from "./styled";
import Search from "./Search";

const IntelligenceFilter = ({
  t,
  totalCount,
  onSearchUpdate,
  currentBusinessId
}) => (
  <>
    <Pane
      justifyContent={["center", "center", "center", "space-between"]}
      alignItems="center"
      flexWrap="wrap"
      mb={[3, 3, 3, 4]}
    >
      <Flex alignItems="center" mb={[3, 3, 3, 0]}>
        <Box mr={[3, 3, 3, 4]}>
          <TotalClientsCount>{totalCount}</TotalClientsCount>
        </Box>
        <TotalClientsLabel>{t("intelligence:newMessages")}</TotalClientsLabel>
      </Flex>
      <Search
        t={t}
        onSearchUpdate={onSearchUpdate}
        currentBusinessId={currentBusinessId}
      />
    </Pane>
  </>
);

IntelligenceFilter.propTypes = {
  t: func.isRequired,
  onSearchUpdate: func.isRequired,
  totalCount: number.isRequired,
  currentBusinessId: string
};

IntelligenceFilter.defaultProps = {
  currentBusinessId: null
};

export default IntelligenceFilter;
