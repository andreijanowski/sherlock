import React from "react";
import { func, string } from "prop-types";

import { linksGroupShape } from "../types";
import { LinksGroupItem, LinksGroupLabel } from "./styled";

const LinksGroup = ({
  group: { label: groupLabel, items },
  basePath,
  onLinkClick
}) => (
  <>
    {groupLabel && <LinksGroupLabel>{groupLabel}</LinksGroupLabel>}
    {items.map(({ label, href }) => {
      const fullPath = `${basePath}${href}`;
      const onClick = e => {
        e.preventDefault();
        onLinkClick(fullPath);
      };
      return (
        <LinksGroupItem href={fullPath} onClick={onClick}>
          {label}
        </LinksGroupItem>
      );
    })}
  </>
);

LinksGroup.propTypes = {
  group: linksGroupShape.isRequired,
  basePath: string.isRequired,
  onLinkClick: func.isRequired
};

export default LinksGroup;
