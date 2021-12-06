import React, { Fragment } from "react";

import { configShape, sectionItemShape } from "../types";
import { List, ListGroupLabel } from "./styled";
import MenuItem from "./MenuItem";

const Menu = ({ config, activeItem }) => (
  <List>
    {config.map(group => (
      <Fragment key={group.id}>
        {group.label && <ListGroupLabel>{group.label}</ListGroupLabel>}
        {group.items.map(item => (
          <MenuItem key={item.label} item={item} activeItem={activeItem} />
        ))}
      </Fragment>
    ))}
  </List>
);

Menu.propTypes = {
  config: configShape.isRequired,
  activeItem: sectionItemShape.isRequired
};

export default Menu;
