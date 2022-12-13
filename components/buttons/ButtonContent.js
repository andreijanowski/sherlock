import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify-icon/react";
import clsx from "clsx";

/**
 * Button content component, only used in creating custom buttons
 * @param {PropTypes.InferProps<ButtonContent.propTypes> & Object.<string, any>} props
 */
const ButtonContent = ({
  as: BaseComponent,
  prepend,
  append,
  size,
  icon,
  iconSize,
  children,
  renderProps,
  ...props
}) => {
  renderProps["height"] = iconSize;

  const render = (item, isIcon) => {
    if (isIcon && typeof item === "string") {
      return <Icon icon={item} {...renderProps} />;
    }
    if (typeof item === "function") {
      return item(props);
    }
    return item;
  };

  return (
    <BaseComponent {...props}>
      {prepend && (
        <span
          className={clsx(
            "inline-flex",
            size === "sm" && "mr-1 -ml-0.5",
            size === "md" && "mr-2 -ml-1",
            size === "lg" && "mr-3 -ml-1.5"
          )}
        >
          {render(prepend, true)}
        </span>
      )}
      {icon ? render(icon, true) : render(children)}
      {append && (
        <span
          className={clsx(
            "inline-flex",
            size === "sm" && "ml-1 -mr-0.5",
            size === "md" && "ml-2 -mr-1",
            size === "lg" && "ml-3 -mr-1.5"
          )}
        >
          {render(append, true)}
        </span>
      )}
    </BaseComponent>
  );
};

ButtonContent.propTypes = {
  append: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  as: PropTypes.elementType,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  iconSize: PropTypes.number,
  prepend: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  renderProps: PropTypes.object,
  size: PropTypes.oneOf(["sm", "md", "lg"])
};

ButtonContent.defaultProps = {
  append: null,
  as: React.Fragment,
  children: null,
  icon: false,
  iconSize: undefined,
  prepend: null,
  renderProps: {},
  size: "md"
};

export default ButtonContent;
