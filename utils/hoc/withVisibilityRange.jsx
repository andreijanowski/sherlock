import React from "react";
import { arrayOf, number } from "prop-types";

import { useWindowWidthInRange } from "../hooks";

export const withVisibilityRange = Component => {
  const WrappedComponent = ({ visibilityRange, ...props }) => {
    const isRangeSatisfied = useWindowWidthInRange(visibilityRange);

    if (!isRangeSatisfied) {
      return null;
    }

    return <Component {...props} />;
  };

  WrappedComponent.propTypes = {
    visibilityRange: arrayOf(number).isRequired
  };

  return WrappedComponent;
};

// min edge is included, max edge is not included
withVisibilityRange.propTypes = {
  visibilityRange: arrayOf(number).isRequired
};
