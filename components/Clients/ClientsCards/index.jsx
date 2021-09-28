import React from "react";
import { func, shape, number } from "prop-types";

import { ExpandIconRestyled } from "components/Icons";
import ClientsCard from "./ClientsCard";
import { Card, LoadMoreButton } from "./styled";

const ClientsCards = ({
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
    <>
      {clients.toArray().map(([, client]) => {
        const clientId = client.get("id");
        const activeClientId = activeClient && activeClient.get("id");
        const isActive = clientId === activeClientId;

        return (
          <ClientsCard
            key={clientId}
            t={t}
            client={client}
            isActive={isActive}
            onClientClick={onClientClick}
          />
        );
      })}
      {hasMore && (
        <Card onClick={onLoadMoreClick}>
          <LoadMoreButton>
            <ExpandIconRestyled />
          </LoadMoreButton>
        </Card>
      )}
    </>
  );
};

ClientsCards.propTypes = {
  t: func.isRequired,
  onClientClick: func.isRequired,
  onLoadMoreClick: func.isRequired,
  totalCount: number.isRequired,
  clients: shape(),
  activeClient: shape()
};

ClientsCards.defaultProps = {
  clients: null,
  activeClient: null
};

export default ClientsCards;
