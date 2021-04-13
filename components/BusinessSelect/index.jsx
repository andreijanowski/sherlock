import React, { useMemo, useCallback } from "react";
import { func, shape, string } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { setCurrentBusiness } from "actions/app";
import { postBusiness } from "actions/businesses";
import prepareBusinessesList from "utils/prepareBusinessesList";
import Select from "components/Select";

const BUSINESS_PAGE_URL = "/app/profile/basic-information/";

const BusinessSelect = ({
  t,
  lng,
  business,
  businessId,
  businesses,
  addBusiness,
  changeCurrentBusiness
}) => {
  const router = useRouter();

  const value = useMemo(
    () => ({
      value: businessId,
      label:
        (business && business.get("name")) ||
        t("app:manageProfile.unnamedBusiness"),
      src: business && business.getIn(["logo", "url"])
    }),
    [business, businessId, t]
  );

  const items = useMemo(() => prepareBusinessesList(t, businesses), [
    t,
    businesses
  ]);

  const handleChange = useCallback(
    newBusiness => {
      changeCurrentBusiness(newBusiness.value);
    },
    [changeCurrentBusiness]
  );

  const onBusinessCreated = useCallback(() => {
    router.push(`/${lng}${BUSINESS_PAGE_URL}`);
  }, [lng, router]);

  const bottomAction = useMemo(
    () => ({
      text: t("app:manageProfile.addNewBusiness"),
      handleClick: () => {
        addBusiness(onBusinessCreated);
      }
    }),
    [t, addBusiness, onBusinessCreated]
  );

  return (
    <Select
      value={value}
      items={items}
      onChange={handleChange}
      bottomAction={bottomAction}
      withImage
      restyled
    />
  );
};

BusinessSelect.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired,
  businessId: string,
  businesses: shape(),
  business: shape()
};

BusinessSelect.defaultProps = {
  businesses: null,
  business: null,
  businessId: ""
};

export default connect(
  state => {
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business = businessData && businessData.get("businesses").first();

    return {
      businessId: business && business.get("id"),
      business: business && business.get("attributes"),
      businesses: state.getIn([
        "users",
        "profileBusinesses",
        "data",
        "businesses"
      ])
    };
  },
  { changeCurrentBusiness: setCurrentBusiness, addBusiness: postBusiness }
)(BusinessSelect);
