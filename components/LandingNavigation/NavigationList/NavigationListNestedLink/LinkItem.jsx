import React from "react";
import { func } from "prop-types";

import { useLng } from "utils/hooks";
import { Link, Icon } from "./styled";
import { linkShape } from "../types";

const LinkItem = ({ item: { href, label, isDisabled, icon }, onLinkClick }) => {
  const lng = useLng();

  if (isDisabled) {
    return (
      <Link isDisabled>
        {icon && <Icon src={icon} />}
        {label}
      </Link>
    );
  }

  const isInternalHref = href.startsWith("/");
  const fullPath = `/${lng}${href}`;
  const onClick = e => {
    e.preventDefault();
    onLinkClick(fullPath);
  };
  return (
    <Link
      {...(isInternalHref
        ? {
            href: fullPath,
            onClick
          }
        : {
            href,
            target: "_blank",
            rel: "nofollow noopener"
          })}
    >
      {icon && <Icon src={icon} />}
      {label}
    </Link>
  );
};

LinkItem.propTypes = {
  item: linkShape.isRequired,
  onLinkClick: func.isRequired
};

export default LinkItem;
