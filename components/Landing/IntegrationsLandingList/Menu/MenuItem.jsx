import React, { Fragment, useState, useEffect } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Router } from "routes";
import { AdaptiveBox } from "components/styleguide/common";
import { useLng } from "utils/hooks";
import { ListGroupItem } from "./styled";
import Partners from "../Partners";
import { sectionItemShape } from "../types";

const MenuItem = ({ item, activeItem }) => {
  const lng = useLng();
  const { label, isComingSoon } = item;
  const isActive = activeItem.label === label;

  const [isOpened, setIsOpened] = useState(isActive);

  useEffect(() => {
    setIsOpened(isActive);
  }, [isActive]);

  const onClick = isComingSoon
    ? undefined
    : () => {
        const href = `/${lng}/?partners=${item.id}#integrations`;
        Router.replaceRoute(href, undefined, { shallow: true });
        setIsOpened(prevState => !prevState);
      };

  return (
    <Fragment key={label}>
      <ListGroupItem
        isComingSoon={isComingSoon}
        isActive={isActive}
        onClick={onClick}
      >
        {label}
        <AdaptiveBox display={["block", null, "none"]}>
          <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} />
        </AdaptiveBox>
      </ListGroupItem>
      {isActive && isOpened && (
        <AdaptiveBox as="li" display={["block", null, "none"]}>
          <Partners activeItem={activeItem} />
        </AdaptiveBox>
      )}
    </Fragment>
  );
};

MenuItem.propTypes = {
  item: sectionItemShape.isRequired,
  activeItem: sectionItemShape.isRequired
};

export default MenuItem;
