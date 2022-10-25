import React from "react";
import { InstantSearch, Configure } from "react-instantsearch-dom";

import ConnectedSearchBox from "./ConnectedSearchBox";
import ConnectedHits from "./ConnectedHits";
import SupplierCategories from "./SupplierCategories";

const SearchApp = ({ t, indexName, searchClient, searchState, ...restProps }) => {
  return (
    <div>
      <InstantSearch
        indexName={indexName}
        searchClient={searchClient}
        searchState={searchState}
        resultsState={restProps.resultsState}
        onSearchParameters={restProps.onSearchParameters}
        onSearchStateChange={restProps.onSearchStateChange}
        createURL={restProps.createURL}
        {...restProps}
      >
        <Configure
          hitsPerPage={10}
          minimumAroundRadius={1000000}
        />

        <ConnectedSearchBox t={t} />

        <SupplierCategories attribute="supplier_categories.name" />
        <ConnectedHits />
      </InstantSearch>
    </div>
  );
};

export default SearchApp;
