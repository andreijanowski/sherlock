import React, { useCallback, useMemo } from "react";
import { func, shape, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";

import { AcceptedDetectiveIcon } from "components/Icons";
import {
  TableDataCell,
  Avatar,
  Name,
  TableDataRow,
  DetectiveIconWrapper,
  AvatarWrapper,
  DetectiveLabel
} from "./styled";
import { getClientDetails } from "../utils";

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
              <Avatar src={avatar} />
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
      <TableDataCell>€{totalMonthlyBudget}</TableDataCell>
      <TableDataCell title={email}>{email}</TableDataCell>
      <TableDataCell>{phone}</TableDataCell>
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
