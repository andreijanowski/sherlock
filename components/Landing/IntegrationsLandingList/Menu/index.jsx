import React, { Fragment } from "react";

import { Router } from "routes";
import { useLng } from "utils/hooks";
import { configShape, sectionItemShape } from "../types";
import { List, ListGroupItem, ListGroupLabel } from "./styled";

const Menu = ({ config, activeItem }) => {
  const lng = useLng();
  return (
    <List>
      {config.map(group => (
        <Fragment key={group.id}>
          {group.label && <ListGroupLabel>{group.label}</ListGroupLabel>}
          {group.items.map(item => {
            const { label, isComingSoon } = item;
            const isActive = activeItem.label === label;
            const onClick = isComingSoon
              ? undefined
              : () => {
                  const href = `/${lng}/?partners=${item.id}#integrations`;
                  Router.replaceRoute(href, undefined, { shallow: true });
                };

            return (
              <ListGroupItem
                key={label}
                isComingSoon={isComingSoon}
                isActive={isActive}
                onClick={onClick}
              >
                {label}
              </ListGroupItem>
            );
          })}
        </Fragment>
      ))}
    </List>
  );
};

Menu.propTypes = {
  config: configShape.isRequired,
  activeItem: sectionItemShape.isRequired
};

export default Menu;
