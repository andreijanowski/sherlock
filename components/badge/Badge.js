import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify-icon/react";
import clsx from "clsx";

const getType = color => {
  const colorData = {
    success: () => ({ textColor: "text-success", bg: "bg-success/[0.1]" }),
    error: () => ({ textColor: "text-error", bg: "bg-error/[0.1]" }),
    danger: () => ({ textColor: "text-warning", bg: "bg-warning/[0.1]" }),
    warning: () => ({ textColor: "text-warning", bg: "bg-warning/[0.1]" }),
    default: () => ({ textColor: "text-base", bg: "bg-gray-900/[0.1]" })
  };
  const colorOpt = colorData[color] ? color : "default";

  return colorData[colorOpt.toLowerCase()]();
};

const getSize = size => {
  const sizeData = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-xl"
  };
  const sizeOpt = sizeData[size] ? size : "sm";

  return sizeData[sizeOpt.toLowerCase()];
};

const Badge = ({ title, type, size, prepend, append, fullWidth, rounded }) => {
  const { textColor, bg } = getType(type);
  const _size = getSize(size);

  const render = (item, isIcon) => {
    if (isIcon && typeof item === "string") {
      return <Icon icon={item} />;
    }
    return item;
  };

  return (
    <div
      className={clsx(
        `flex items-center p-2 ${_size} ${textColor} ${bg}`,
        fullWidth ? "w-full justify-between" : "max-w-fit",
        rounded && "rounded-1"
      )}
    >
      {prepend ? (
        <div className="inline-flex">
          <span className="mr-2 inline-flex">{render(prepend, true)}</span>
          <p className={`font-bold ${_size} ${textColor}`}>{title}</p>
        </div>
      ) : (
        <p className={`font-bold ${_size} ${textColor}`}>{title}</p>
      )}
      {append && (
        <span className="ml-2 inline-flex">{render(append, true)}</span>
      )}
    </div>
  );
};

Badge.defaultProps = {
  type: null,
  size: "sm",
  fullWidth: false,
  rounded: false
};

Badge.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "danger", "warning"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  append: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  fullWidth: PropTypes.bool,
  rounded: PropTypes.bool
};

export default Badge;
