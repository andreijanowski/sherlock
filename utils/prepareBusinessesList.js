export default (t, businesses) =>
  businesses
    ? businesses
        .map(business => ({
          value: business.get("id"),
          label:
            business.getIn(["attributes", "name"]) ||
            t("app:manageProfile.unnamedBusiness"),
          src: business.getIn(["attributes", "logo", "url"])
        }))
        .toList()
        .toArray()
    : [];
