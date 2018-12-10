import i18nInstance from "i18n";

export default (ctx, namespaces) => {
  if (i18nInstance.getInitialProps) {
    const { i18n, initialLanguage } = i18nInstance.getInitialProps(
      ctx.req,
      namespaces
    );
    return { i18n, initialLanguage };
  }
  return null;
};
