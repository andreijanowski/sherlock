import React, { useCallback } from "react";
import { func } from "prop-types";
import { useRouter } from "next/router";

import { useLng } from "utils/hooks";
import { NavigationListItem } from "../styled";
import { linkShape } from "../types";

const NavigationListLink = ({ link: { label, href }, onLinkClick }) => {
  const lng = useLng();
  const { asPath } = useRouter();

  const fullPath = `/${lng}${href}`;
  const isActive = fullPath === asPath;

  const onClick = useCallback(
    e => {
      e.preventDefault();
      onLinkClick(fullPath);
    },
    [fullPath, onLinkClick]
  );

  return (
    <NavigationListItem
      as="a"
      href={fullPath}
      label={label}
      onClick={onClick}
      isActive={isActive}
    >
      {label}
    </NavigationListItem>
  );
};

NavigationListLink.propTypes = {
  link: linkShape.isRequired,
  onLinkClick: func.isRequired
};

export default NavigationListLink;
