export default (t, businesses) =>
  businesses
    ? businesses
        .map(b => ({
          value: b.get("id"),
          label:
            b.getIn(["attributes", "name"]) ||
            t("app:manageProfile.unnamedBusiness"),
          src: b.getIn(["attributes", "logo", "url"])
        }))
        .toList()
        .toArray()
    : [];
