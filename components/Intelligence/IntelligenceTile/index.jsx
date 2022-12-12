import React, { useMemo } from "react";
import { func, shape } from "prop-types";
import TileButton from "./TileButtons";
import TileInfo from "./TileInfo";
import { getIntelligenceDataDetails } from "../utils";

const IntelligenceTile = ({ data, t }) => {
  const details = useMemo(() => getIntelligenceDataDetails(data), [data]);

  return (
    <div
      className={
        "relative flex min-h-45 min-w-full flex-col justify-between rounded-4 border border-gray-300 bg-white p-7 shadow-card"
      }
    >
      <TileInfo data={details} />
      <TileButton t={t} data={details} />
    </div>
  );
};

IntelligenceTile.defaultProps = {
  data: shape()
};

IntelligenceTile.propTypes = {
  data: shape(),
  t: func.isRequired
};

export default IntelligenceTile;
