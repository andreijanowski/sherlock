import React, { useCallback, useEffect, useMemo, useState } from "react";
import { bool, func, shape } from "prop-types";
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

const DebouncedInput = ({ t, onChange, hasAvailablePartners }) => {
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
    <Wrapper centered={hasAvailablePartners}>
      <LeftIcon>
        <SearchIcon />
      </LeftIcon>
      <Input
        value={value}
        onChange={onInputChange}
        autoComplete="off"
        placeholder={
          hasAvailablePartners ? "Type a partner’s name" : t("search")
        }
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
  hasAvailablePartners: bool.isRequired
};

const PartnersSearchBox = ({
  t,
  business,
  fetchPartnersHandler,
  fetchAvailablePartnersHandler,
  hasAvailablePartners,
  activeFilter
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

  useEffect(() => {
    if (hasAvailablePartners) {
      fetchAvailablePartnersHandler({
        search,
        filter: {
          categories: [activeFilter]
        },
        page: 1
      });
    }
  }, [
    fetchAvailablePartnersHandler,
    filter,
    search,
    hasAvailablePartners,
    activeFilter
  ]);

  return (
    <DebouncedInput
      t={t}
      onChange={onSearchChange}
      hasAvailablePartners={hasAvailablePartners}
    />
  );
};

PartnersSearchBox.propTypes = {
  t: func.isRequired,
  fetchPartnersHandler: func.isRequired,
  fetchAvailablePartnersHandler: func.isRequired,
  business: shape(),
  hasAvailablePartners: bool,
  activeFilter: bool
};

PartnersSearchBox.defaultProps = {
  business: null,
  hasAvailablePartners: false,
  activeFilter: ""
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
