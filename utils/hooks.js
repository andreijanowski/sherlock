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

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [threshold]);

  return isLess;
};

export const useWindowWidthMoreOrEqualThen = threshold =>
  !useWindowWidthLessThen(threshold);

// min edge is included, max edge is not included
export const useWindowWidthInRange = range => {
  const [min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER] = range;

  const isMinEdgeSatisfied = useWindowWidthMoreOrEqualThen(min);
  const isMaxEdgeSatisfied = useWindowWidthLessThen(max);

  return isMinEdgeSatisfied && isMaxEdgeSatisfied;
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
