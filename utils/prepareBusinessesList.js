export default (t, businesses) =>
  businesses
    ? businesses.map(b => ({
        value: b.id,
        label: b.name || t("app:manageProfile.unnamedBusiness"),
        src: b.logo.url
      }))
    : [];
