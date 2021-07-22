import React, { useState, useMemo, useEffect, useCallback } from "react";
import { bool, func, shape } from "prop-types";
import { withTranslation } from "i18n";
import { compose } from "redux";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import debounce from "debounce";

import { SearchIcon, CloseIcon } from "components/Icons";
import { fetchPartners } from "actions/partners";
import { WHOLESALERS_URL } from "sections/integrations/utils";
import { Wrapper, Input, LeftIcon, RightIcon } from "./styled";
import { getPartnersFilter } from "./utils";

const namespaces = ["app"];

const DEBOUNCE = 300;

const DebouncedInput = ({ t, onChange, isHiddenOnDesktop }) => {
  const [value, setValue] = useState("");

  const debouncedOnChange = useCallback(debounce(onChange, DEBOUNCE), [
    onChange
  ]);

  const clearSearch = useCallback(() => {
    setValue("");
    debouncedOnChange("");
  }, [debouncedOnChange]);

  const onInputChange = useCallback(
    ({ target }) => {
      setValue(target.value);
      debouncedOnChange(target.value);
    },
    [debouncedOnChange]
  );

  return (
    <Wrapper isHiddenOnDesktop={isHiddenOnDesktop}>
      <LeftIcon>
        <SearchIcon />
      </LeftIcon>
      <Input
        value={value}
        onChange={onInputChange}
        autoComplete="off"
        placeholder={t("search")}
      />
      {value && (
        <RightIcon clickable onClick={clearSearch}>
          <CloseIcon />
        </RightIcon>
      )}
    </Wrapper>
  );
};

DebouncedInput.propTypes = {
  t: func.isRequired,
  onChange: func.isRequired,
  isHiddenOnDesktop: bool
};

DebouncedInput.defaultProps = {
  isHiddenOnDesktop: false
};

const PartnersSearchBox = ({
  t,
  business,
  fetchPartnersHandler,
  isHiddenOnDesktop
}) => {
  const [search, setSearch] = useState("");
  const {
    pathname,
    query: { category }
  } = useRouter();

  const isWholesalersPage = pathname === WHOLESALERS_URL;

  const filter = useMemo(
    () => getPartnersFilter(isWholesalersPage, category, business),
    [isWholesalersPage, category, business]
  );

  const onSearchChange = useCallback(newSearch => {
    setSearch(newSearch);
  }, []);

  const businessId = business && business.get("id");

  useEffect(() => {
    if (businessId) {
      fetchPartnersHandler({
        businessId,
        search,
        filter,
        merge: false,
        page: 1
      });
    }
  }, [businessId, fetchPartnersHandler, filter, search]);

  return (
    <DebouncedInput
      isHiddenOnDesktop={isHiddenOnDesktop}
      t={t}
      onChange={onSearchChange}
    />
  );
};

PartnersSearchBox.propTypes = {
  t: func.isRequired,
  fetchPartnersHandler: func.isRequired,
  business: shape(),
  isHiddenOnDesktop: bool
};

PartnersSearchBox.defaultProps = {
  business: null,
  isHiddenOnDesktop: false
};

const mapState = state => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  const business = businessData && businessData.get("businesses").first();

  return {
    business
  };
};

const mapDispatch = {
  fetchPartnersHandler: fetchPartners
};

export default compose(
  withTranslation(namespaces),
  connect(
    mapState,
    mapDispatch
  )
)(PartnersSearchBox);
