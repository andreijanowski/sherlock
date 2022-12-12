import React, { useMemo } from "react";
import { string } from "prop-types";
import { Tooltip } from "react-tooltip";

const TileInfo = ({ data }) => {
  const { id, title, subtitle, logoUrl } = data;
  const showTooltip = useMemo(
    () => !!(subtitle.length > 50),
    [subtitle.length]
  );

  return (
    <div className="flex">
      <div className="h-13 w-13 rounded-2 bg-white p-2 drop-shadow-custom">
        <img src={logoUrl} alt="logo" />
      </div>
      <div className="ml-3 h-13 w-13 flex-grow">
        <h2 className="mb-1 text-ellipsis font-bold text-base text-primary-dark line-clamp-2">
          {title}
        </h2>
        {subtitle && (
          <p
            id={`subtitle-tooltip-${id}`}
            className="text-ellipsis text-xs line-clamp-2"
          >
            {subtitle}
          </p>
        )}
      </div>
      {showTooltip && (
        <Tooltip
          className="tooltip"
          anchorId={`subtitle-tooltip-${id}`}
          content={subtitle}
        />
      )}
    </div>
  );
};

TileInfo.defaultProps = {
  title: "",
  subtitle: null,
  logoUrl: ""
};

TileInfo.propTypes = {
  title: string.isRequired,
  logoUrl: string.isRequired,
  subtitle: string
};

export default TileInfo;
