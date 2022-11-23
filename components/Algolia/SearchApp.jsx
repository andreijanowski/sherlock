import React from "react";
import { InstantSearch, Configure } from "react-instantsearch-dom";

import { arrayOf, bool, func, node, number, oneOf, string } from "prop-types";
import ConnectedFilter from "./ConnectedFilter";

const SearchApp = ({
  label,
  placeholder,
  indexName,
  hitsPerPage,
  children,
  backUrl,
  filters,
  t,
  hasFavourite,
  hasBack,
  ...restProps
}) => (
  <div className="flex flex-1 flex-col">
    <InstantSearch
      indexName={indexName}
      resultsState={restProps.resultsState}
      onSearchParameters={restProps.onSearchParameters}
      onSearchStateChange={restProps.onSearchStateChange}
      createURL={restProps.createURL}
      {...restProps}
    >
      <Configure hitsPerPage={hitsPerPage} filters={filters} />

      <ConnectedFilter
        backUrl={backUrl}
        label={label}
        placeholder={placeholder}
        t={t}
        hasBack={hasBack}
        hasFavourite={hasFavourite}
      />

      {children}
    </InstantSearch>
  </div>
);

SearchApp.propTypes = {
  label: string,
  placeholder: string,
  hitsPerPage: number,
  indexName: string.isRequired,
  children: oneOf([arrayOf(node), node]).isRequired,
  backUrl: string,
  filters: string,
  t: func.isRequired,
  hasFavourite: bool,
  hasBack: bool
};

SearchApp.defaultProps = {
  label: "",
  placeholder: "",
  hitsPerPage: 50,
  backUrl: "",
  filters: "",
  hasFavourite: false,
  hasBack: false
};

export default SearchApp;
