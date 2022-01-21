import React from "react";
import { func } from "prop-types";

import { useLng } from "utils/hooks";
import { Link } from "./styled";
import { linkShape } from "../types";

const LinkItem = ({ item: { href, label, isDisabled }, onLinkClick }) => {
  const lng = useLng();

  if (isDisabled) {
    return <Link isDisabled>{label}</Link>;
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
      {label}
    </Link>
  );
};

LinkItem.propTypes = {
  item: linkShape.isRequired,
  onLinkClick: func.isRequired
};

export default LinkItem;
