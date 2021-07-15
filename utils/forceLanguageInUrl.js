import { LANGUAGES } from "components/LanguageSwitcher";
import replacePathLng from "utils/replacePathLng";

const IGNORED_PATHS = ["locales", "static", "_next"];

export default async ctx => {
  if (!ctx || !ctx.req) return;
  const {
    req: { url, i18n }
  } = ctx;

  const urlLng = url.split("/").filter(Boolean)[0];
  // dont need to process these request
  if (IGNORED_PATHS.includes(urlLng)) return;

  const isValidLng = LANGUAGES.includes(urlLng);
  if (isValidLng) {
    if (i18n.language !== urlLng) {
      await i18n.changeLanguage(urlLng);
    }
    return;
  }

  const supportedLanguage = ctx.req.acceptsLanguages(LANGUAGES) || "en";
  await i18n.changeLanguage(supportedLanguage);

  const urlWithReplacedLng = replacePathLng(url, supportedLanguage);
  const lngWasNotReplaced = urlWithReplacedLng === url;
  const newUrl = lngWasNotReplaced
    ? `/${supportedLanguage}${url}`
    : urlWithReplacedLng;

  ctx.res.writeHead(302, {
    Location: `${ctx.req.protocol}://${ctx.req.headers.host}${newUrl}`
  });
  ctx.res.end();
};
