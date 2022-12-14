import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
// import { Link } from "react-router-dom";
import { Link } from "routes";
import ButtonContent from "./ButtonContent";

const getIconSize = (icon, size, iconOnly) => {
  switch (size) {
    case "sm":
      return icon ? (iconOnly ? 22 : 20) : 16;
    case "lg":
      return icon ? (iconOnly ? 44 : 26) : 26;
    default:
      // medium
      return icon ? (iconOnly ? 34 : 26) : 20;
  }
};

/**
 * @typedef {import("react-router-dom").LinkProps} LinkProps
 */

/**
 * Generic button component
 * @param {PropTypes.InferProps<Button.propTypes> & React.DOMAttributes<HTMLButtonElement | HTMLAnchorElement> & Partial<LinkProps>} props
 * @example
 * <Button
 *   color="primary"
 *   variant="outlined"
 *   append="mdi:close"
 * >
 *   Cancel
 * </Button>
 * @example
 * // icon button
 * <Button variant="tonal" icon="mdi:phone" />
 * @example
 * // icon-text button
 * <Button variant="outlined" icon="mdi:phone">
 *   Call
 * </Button>
 * @example
 * // icon-text button with custom icon and text colors
 * <Button variant="outlined" icon="mdi:phone" className="text-red-500">
 *   <span className="text-gray-300">Call</span>
 * </Button>
 */

const Button = ({
  variant,
  color,
  square,
  icon,
  size,
  disabled,
  fullWidth,
  horizontal,
  prepend,
  append,
  className,
  rootClassName,
  children,
  ...props
}) => {
  const iconSize = getIconSize(icon, size, variant === "icon");
  const iconEl = typeof icon !== "boolean" ? icon : null;

  const isLink = Boolean(props.to || props.href);
  const isIconText = Boolean(icon && children);

  const BaseComponent =
    /** @type {React.ComponentType<{[key: string]: any}>} */ (
      props.to ? Link : props.href ? "a" : "button"
    );

  const buttonClasses = clsx(
    // base style
    "relative inline-flex items-center justify-center overflow-hidden",
    // overlay base
    "before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200",
    isIconText
      ? "before:group-aria-disabled:opacity-0"
      : "before:aria-disabled:opacity-0",
    // hover, active, and tonal styles
    variant === "tonal" && "before:opacity-10",
    variant === "tonal"
      ? isIconText
        ? "before:group-hover:opacity-20 before:group-active:opacity-30"
        : "before:hover:opacity-20 before:active:opacity-30"
      : isIconText
      ? "before:group-hover:opacity-10 before:group-active:opacity-20"
      : "before:hover:opacity-10 before:active:opacity-20",
    // hover, active, and icon styles
    variant === "icon" && "w-full h-full",
    // square style
    square ? "rounded-2" : "rounded-full",
    // size styles
    size === "sm" &&
      (icon ? (variant === "icon" ? "h-5 w-5" : "h-8 w-8") : "h-7 px-3.5"),
    size === "md" &&
      (icon ? (variant === "icon" ? "h-7 w-7" : "h-10 w-10") : "h-9 px-4.5"),
    size === "lg" &&
      (icon ? (variant === "icon" ? "h-9 w-9" : "h-12 w-12") : "h-12 px-6.5"),
    {
      // outlined style
      "border border-current": variant === "outlined",
      // gradient style
      "bg-gradient-to-r from-primary-dark to-primary text-white":
        !disabled && color === "gradient",
      // disabled style
      "bg-gray-300/30": disabled && variant === "filled"
    },
    // primary style
    !disabled &&
      color === "primary" &&
      (variant === "filled" ? "bg-primary text-white" : "text-primary"),
    // inherit classes
    className
  );

  return (
    <BaseComponent
      type={isLink ? undefined : "button"}
      role={isLink ? "button" : undefined}
      disabled={isLink ? undefined : disabled}
      aria-disabled={disabled ? "true" : undefined}
      className={clsx(
        // base style
        "select-none leading-4 outline-none",
        // size styles
        size === "sm" && (icon ? "text-xxs" : "text-xs"),
        size === "md" && (icon ? "text-xs" : "text-sm"),
        size === "lg" && (icon ? "text-sm" : "text-base"),
        // icon-text styles
        isIconText && (horizontal ? "flex-row" : "flex-col"),
        isIconText
          ? "group inline-flex items-center justify-center gap-x-2 gap-y-1.5"
          : buttonClasses,
        {
          // block style
          "min-w-full flex-auto flex-shrink-0": fullWidth,
          // disabled style
          "pointer-events-none text-gray-300": disabled,
          // link styles
          "text-center": isLink
        },
        rootClassName
      )}
      {...props}
    >
      {isIconText ? (
        <>
          <ButtonContent
            as="span"
            className={buttonClasses}
            iconSize={iconSize}
            icon={iconEl}
          />
          <ButtonContent
            as="div"
            append={append}
            prepend={prepend}
            iconSize={iconSize}
            size={size}
          >
            {children}
          </ButtonContent>
        </>
      ) : (
        <ButtonContent
          append={append}
          prepend={prepend}
          iconSize={iconSize}
          size={size}
          icon={iconEl}
        >
          {children}
        </ButtonContent>
      )}
    </BaseComponent>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Append an icon or arbitrary element to the button,
   * an iconify icon can be provided as a string.
   * @example
   * <Button append="mdi:send">Send</Button>
   * // custom jsx
   * <Button append={<Icon icon="mdi:send" />}>Send</Button>
   * // custom jsx with default props
   * <Button append={(props) => <Icon icon="mdi:send" {...props} />}>Send</Button>
   */
  append: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  className: PropTypes.string,
  /** Applies default bg/text color to the button for commonly used colors */
  color: PropTypes.oneOf(["primary", "gradient"]),
  /* Switches to disabled style and makes the button non-interactive */
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  /** Only used when running in icon-text mode to display in a row */
  horizontal: PropTypes.bool,
  /**
   * Makes this into an icon button,
   * an iconify icon can be provided as a string.
   * @example
   * <Button icon="mdi:phone" />
   * // custom jsx
   * <Button icon={<Icon icon="mdi:phone" />} />
   * // custom jsx with default props
   * <Button icon={(props) => <Icon icon="mdi:phone" {...props} />} />
   */
  icon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  /**
   * Prepend an icon or arbitrary element to the button,
   * an iconify icon can be provided as a string.
   * @example
   * <Button prepend="mdi:send">Send</Button>
   * // custom jsx
   * <Button prepend={<Icon icon="mdi:send" />}>Send</Button>
   * // custom jsx with default props
   * <Button prepend={(props) => <Icon icon="mdi:send" {...props} />}>Send</Button>
   */
  prepend: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  /** Only needed when running in icon-text mode to target the root element */
  rootClassName: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  /** Uses less rounded corners */
  square: PropTypes.bool,
  /**
   * Changes the overall style of the button.
   * Must be one of "filled", "outlined", "tonal", "text".
   *
   * **Filled**: has a background color.
   *
   * **Outlined**: has no background and a border the same color as the text.
   *
   * **Tonal**: has a background color that is a light version of the text color.
   *
   * **Text**: has no background or border.
   *
   * **icon**: has no background and hover changes icon color.
   *
   * *The "filled" variant needs a background and text color all other variants
   * only need a text color to be set.*
   *
   * @default filled
   */
  variant: PropTypes.oneOf(["filled", "outlined", "tonal", "text", "icon"])
};

Button.defaultProps = {
  append: null,
  className: "",
  color: "",
  disabled: false,
  fullWidth: false,
  horizontal: false,
  icon: false,
  prepend: null,
  rootClassName: "",
  size: "md",
  square: false,
  variant: "filled"
};

export default Button;
