import React from "react";
import { func, number, shape } from "prop-types";

import { ExpandIconRestyled } from "components/Icons";
import {
  LoadMoreButton,
  Table,
  TableDataRow,
  TableHeadCell
} from "components/Table";
import ClientsTableRow from "./ClientsTableRow";
import { Pane } from "../styled";

const ClientsTable = ({
  t,
  clients,
  onClientClick,
  activeClient,
  totalCount,
  onLoadMoreClick
}) => {
  if (!clients || !clients.size) return null;

  const hasMore = totalCount > clients.size;
  return (
    <Pane noPadding>
      <Table>
        <thead>
          <tr>
            <TableHeadCell>{t("clients:table.name")}</TableHeadCell>
            <TableHeadCell>{t("clients:table.email")}</TableHeadCell>
            <TableHeadCell>{t("clients:table.phone")}</TableHeadCell>
            <TableHeadCell>{t("clients:table.budget")}</TableHeadCell>
          </tr>
        </thead>
        <tbody>
          {clients.toArray().map(([, client]) => {
            const clientId = client.get("id");
            const activeClientId = activeClient && activeClient.get("id");
            const isActive = clientId === activeClientId;

            return (
              <ClientsTableRow
                key={clientId}
                t={t}
                client={client}
                isActive={isActive}
                onClientClick={onClientClick}
              />
            );
          })}
          {hasMore && (
            <TableDataRow onClick={onLoadMoreClick}>
              <LoadMoreButton>
                <ExpandIconRestyled />
              </LoadMoreButton>
            </TableDataRow>
          )}
        </tbody>
      </Table>
    </Pane>
  );
};

ClientsTable.propTypes = {
  t: func.isRequired,
  onClientClick: func.isRequired,
  onLoadMoreClick: func.isRequired,
  totalCount: number.isRequired,
  clients: shape(),
  activeClient: shape()
};

ClientsTable.defaultProps = {
  clients: null,
  activeClient: null
};

export default ClientsTable;
