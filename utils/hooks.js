import { useState, useLayoutEffect } from "react";

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
