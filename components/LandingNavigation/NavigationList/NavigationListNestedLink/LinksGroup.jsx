import React from "react";
import { func } from "prop-types";

import { useLng } from "utils/hooks";
import { linksGroupShape } from "../types";
import { LinksGroupItem, LinksGroupLabel } from "./styled";

const LinksGroup = ({ group: { label: groupLabel, items }, onLinkClick }) => {
  const lng = useLng();

  return (
    <>
      {groupLabel && <LinksGroupLabel>{groupLabel}</LinksGroupLabel>}
      {items.map(({ label, href, isDisabled }) => {
        const key = `${label}-${href}`;
        if (isDisabled) {
          return (
            <LinksGroupItem key={key} isDisabled>
              {label}
            </LinksGroupItem>
          );
        }

        const isInternalHref = href.startsWith("/");
        const fullPath = `/${lng}${href}`;
        const onClick = e => {
          e.preventDefault();
          onLinkClick(fullPath);
        };
        return (
          <LinksGroupItem
            key={key}
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
          </LinksGroupItem>
        );
      })}
    </>
  );
};

LinksGroup.propTypes = {
  group: linksGroupShape.isRequired,
  onLinkClick: func.isRequired
};

export default LinksGroup;
