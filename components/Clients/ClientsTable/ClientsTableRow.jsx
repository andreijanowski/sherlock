import React, { useCallback, useMemo } from "react";
import { func, shape, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";

import { AcceptedDetectiveIcon } from "components/Icons";
import { TableDataCell, TableDataRow } from "components/Table";
import { DetectiveIconWrapper } from "./styled";
import { getClientDetails } from "../utils";
import { Avatar, AvatarWrapper, Name, DetectiveLabel } from "../styled";

const ClientsTableRow = ({ t, client, onClientClick, isActive }) => {
  const onRowClick = useCallback(() => {
    onClientClick(client);
  }, [client, onClientClick]);

  const {
    avatar,
    name,
    personal: { phone, email },
    budget: { totalMonthlyBudget },
    acceptedFoodDetective
  } = useMemo(() => getClientDetails(client, t), [client, t]);

  return (
    <TableDataRow onClick={onRowClick} isActive={isActive}>
      <TableDataCell>
        <Flex alignItems="center">
          <Box mr={3}>
            <AvatarWrapper>
              <Avatar src={avatar} small />
              {acceptedFoodDetective && (
                <DetectiveIconWrapper>
                  <AcceptedDetectiveIcon />
                </DetectiveIconWrapper>
              )}
            </AvatarWrapper>
          </Box>
          <Box>
            <Name>{name}</Name>
            {acceptedFoodDetective && (
              <DetectiveLabel>{t("clients:acceptedDetective")}</DetectiveLabel>
            )}
          </Box>
        </Flex>
      </TableDataCell>
      <TableDataCell title={email}>{email}</TableDataCell>
      <TableDataCell>{phone}</TableDataCell>
      <TableDataCell>€{totalMonthlyBudget}</TableDataCell>
    </TableDataRow>
  );
};

ClientsTableRow.propTypes = {
  t: func.isRequired,
  client: shape().isRequired,
  onClientClick: func.isRequired,
  isActive: bool.isRequired
};

export default ClientsTableRow;
