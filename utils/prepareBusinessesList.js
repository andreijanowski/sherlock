export default (t, businesses) =>
  businesses
    ? businesses
        .map(b => ({
          value: b.get("id"),
          label: b.get("name") || t("app:manageProfile.unnamedBusiness"),
          src: b.getIn(["logo", "url"])
        }))
        .toList()
        .toArray()
    : [];
