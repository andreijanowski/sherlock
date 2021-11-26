import { useState, useLayoutEffect } from "react";

import { useTranslation } from "i18n";
import isServer from "./isServer";

export const useWindowWidthLessThen = threshold => {
  const windowWidth = isServer ? Number.MAX_SAFE_INTEGER : window.innerWidth;

  const [isLess, setIsLess] = useState(windowWidth < threshold);

  useLayoutEffect(() => {
    if (isServer) return () => {};
    const onResize = () => {
      const newWindowWidth = window.innerWidth;
      setIsLess(newWindowWidth < threshold);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [threshold]);

  return isLess;
};

export const useLng = () => {
  const {
    i18n: { language }
  } = useTranslation();
  return language;
};

export const useT = (...params) => {
  const { t } = useTranslation(...params);
  return t;
};
