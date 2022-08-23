import React, { useCallback, useEffect, useMemo, useState } from "react";
import { bool, func, shape, number, string } from "prop-types";
import { withTranslation } from "i18n";
import { compose } from "redux";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import debounce from "debounce";

import { CloseIcon, SearchIcon } from "components/Icons";
import { fetchPartners, fetchAvailablePartners } from "actions/partners";
import { WHOLESALERS_URL } from "sections/integrations/utils";
import { withVisibilityRange } from "utils/hoc/withVisibilityRange";
import { Input, LeftIcon, RightIcon, Wrapper } from "./styled";
import { getPartnersFilter } from "./utils";

const namespaces = ["app"];

const DEBOUNCE = 300;

const DebouncedInput = ({
  t,
  onChange,
  hasAvailablePartners,
  activeFilter
}) => {
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

  useEffect(() => {
    setValue("");
  }, [activeFilter]);

  return (
    <Wrapper centered={hasAvailablePartners}>
      <LeftIcon>
        <SearchIcon />
      </LeftIcon>
      <Input
        value={value}
        onChange={onInputChange}
        autoComplete="off"
        placeholder={hasAvailablePartners ? t("typeName") : t("search")}
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
  hasAvailablePartners: bool.isRequired,
  activeFilter: string.isRequired
};

const PartnersSearchBox = ({
  t,
  business,
  fetchPartnersHandler,
  fetchAvailablePartnersHandler,
  hasAvailablePartners,
  activeFilter,
  page,
  clearPage
}) => {
  const [search, setSearch] = useState("");
  const {
    pathname,
    query: { category }
  } = useRouter();

  const isWholesalersPage = pathname === WHOLESALERS_URL;

  const filter = useMemo(
    () =>
      getPartnersFilter(isWholesalersPage, category || activeFilter, business),
    [isWholesalersPage, category, business, activeFilter]
  );

  const onSearchChange = useCallback(
    newSearch => {
      setSearch(newSearch);
      clearPage();
    },
    [clearPage]
  );

  const businessId = business && business.get("id");

  useEffect(() => {
    setSearch("");
  }, [activeFilter]);

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

  useEffect(() => {
    if (hasAvailablePartners) {
      fetchAvailablePartnersHandler({
        search,
        filter: {
          categories: [activeFilter]
        },
        merge: page > 1,
        page
      });
    }
  }, [
    fetchAvailablePartnersHandler,
    filter,
    search,
    hasAvailablePartners,
    activeFilter,
    page
  ]);

  return (
    <DebouncedInput
      t={t}
      onChange={onSearchChange}
      hasAvailablePartners={hasAvailablePartners}
      activeFilter={hasAvailablePartners ? activeFilter : ""}
    />
  );
};

PartnersSearchBox.propTypes = {
  t: func.isRequired,
  fetchPartnersHandler: func.isRequired,
  fetchAvailablePartnersHandler: func.isRequired,
  business: shape(),
  hasAvailablePartners: bool,
  activeFilter: bool,
  page: number,
  clearPage: func.isRequired
};

PartnersSearchBox.defaultProps = {
  business: null,
  hasAvailablePartners: false,
  activeFilter: "",
  page: 1
};

const mapState = state => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  const business = businessData && businessData.get("businesses").first();

  return {
    business
  };
};

const mapDispatch = {
  fetchPartnersHandler: fetchPartners,
  fetchAvailablePartnersHandler: fetchAvailablePartners
};

export default compose(
  withVisibilityRange,
  withTranslation(namespaces),
  connect(mapState, mapDispatch)
)(PartnersSearchBox);
