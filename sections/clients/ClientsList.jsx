import React, { useCallback, useState, useEffect } from "react";
import { func, shape, number, string, bool } from "prop-types";
import { connect } from "react-redux";
import { action as toggleMenuAction } from "redux-burger-menu/immutable";
import { debounce } from "lodash";

import {
  selectClientsData,
  selectClientsTotalCount,
  selectCurrentBusinessId,
  selectClientsIsFetching
} from "selectors/users";
import { fetchBusinessClients as fetchBusinessClientsActions } from "actions/businesses";
import {
  ClientsFilter,
  ClientsTable,
  ClientDetailsSlider
} from "components/Clients";

const INITIAL_PAGE = 1;
const INITIAL_SEARCH = "";
const INPUT_DELAY = 300;

const ClientsList = ({
  t,
  isFetching,
  clients,
  totalCount,
  toggleMenu,
  fetchBusinessClients,
  currentBusinessId
}) => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [search, setSearch] = useState(INITIAL_SEARCH);
  const [activeClient, setActiveClient] = useState(null);

  const onClientClick = useCallback(
    client => {
      setActiveClient(client);
      toggleMenu(true);
    },
    [toggleMenu]
  );

  const onSearchUpdate = useCallback(
    debounce(newSearch => {
      setPage(INITIAL_PAGE);
      setSearch(newSearch);
      fetchBusinessClients(currentBusinessId, INITIAL_PAGE, newSearch);
    }, INPUT_DELAY),
    [currentBusinessId]
  );

  const onLoadMoreClick = useCallback(() => {
    if (isFetching) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBusinessClients(currentBusinessId, nextPage, search);
  }, [currentBusinessId, fetchBusinessClients, isFetching, page, search]);

  useEffect(() => {
    setPage(INITIAL_PAGE);
    setSearch(INITIAL_SEARCH);
  }, [currentBusinessId]);

  return (
    <>
      <ClientsFilter
        t={t}
        totalCount={totalCount}
        onSearchUpdate={onSearchUpdate}
        currentBusinessId={currentBusinessId}
      />
      <ClientsTable
        t={t}
        clients={clients}
        totalCount={totalCount}
        activeClient={activeClient}
        onClientClick={onClientClick}
        onLoadMoreClick={onLoadMoreClick}
      />
      <ClientDetailsSlider t={t} client={activeClient} />
    </>
  );
};

ClientsList.propTypes = {
  t: func.isRequired,
  toggleMenu: func.isRequired,
  fetchBusinessClients: func.isRequired,
  totalCount: number.isRequired,
  isFetching: bool.isRequired,
  currentBusinessId: string,
  clients: shape()
};

ClientsList.defaultProps = {
  clients: null,
  currentBusinessId: null
};

const mapState = state => ({
  clients: selectClientsData(state),
  totalCount: selectClientsTotalCount(state),
  currentBusinessId: selectCurrentBusinessId(state),
  isFetching: selectClientsIsFetching(state)
});
const mapDispatch = {
  toggleMenu: toggleMenuAction,
  fetchBusinessClients: fetchBusinessClientsActions
};

export default connect(
  mapState,
  mapDispatch
)(ClientsList);
