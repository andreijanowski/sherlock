import React from "react";
import { InstantSearch, Configure } from "react-instantsearch-dom";

import { arrayOf, node, number, oneOf, string } from "prop-types";
import ConnectedFilter from "./ConnectedFilter";
import Categories from "./Categories";

const SearchApp = ({
  label,
  placeholder,
  indexName,
  hitsPerPage,
  categories,
  categoryName,
  children,
  ...restProps
}) => (
  <div>
    <InstantSearch
      indexName={indexName}
      resultsState={restProps.resultsState}
      onSearchParameters={restProps.onSearchParameters}
      onSearchStateChange={restProps.onSearchStateChange}
      createURL={restProps.createURL}
      {...restProps}
    >
      <Configure hitsPerPage={hitsPerPage} />

      <ConnectedFilter label={label} placeholder={placeholder} />

      <Categories categories={categories} attribute={categoryName} />
      {children}
    </InstantSearch>
  </div>
);

SearchApp.propTypes = {
  label: string,
  placeholder: string,
  categories: arrayOf(string).isRequired,
  categoryName: string.isRequired,
  hitsPerPage: number,
  indexName: string.isRequired,
  children: oneOf([arrayOf(node), node]).isRequired
};

SearchApp.defaultProps = {
  label: "",
  placeholder: "",
  hitsPerPage: 10
};

export default SearchApp;
