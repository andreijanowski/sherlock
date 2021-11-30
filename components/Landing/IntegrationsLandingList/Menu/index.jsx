import React, { Fragment } from "react";
import { func } from "prop-types";

import { configShape, sectionItemShape } from "../types";
import { List, ListGroupItem, ListGroupLabel } from "./styled";

const Menu = ({ config, activeItem, setActiveItem }) => (
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
                setActiveItem(item);
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

Menu.propTypes = {
  config: configShape.isRequired,
  activeItem: sectionItemShape.isRequired,
  setActiveItem: func.isRequired
};

export default Menu;
