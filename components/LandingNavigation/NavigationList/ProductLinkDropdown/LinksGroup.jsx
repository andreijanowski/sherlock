import React from "react";
import { Box } from "@rebass/grid";
import { func } from "prop-types";

import { linksGroupShape } from "./types";
import { LinksGroupTitle } from "./styled";
import LinkItem from "./LinkItem";

const LinksGroup = ({ group, onLinkClick }) => (
  <>
    <LinksGroupTitle mb={4}>{group.title}</LinksGroupTitle>
    {group.items.map(item => (
      <Box key={item.title} mb={21}>
        <LinkItem link={item} onLinkClick={onLinkClick} status={item.status} />
      </Box>
    ))}
  </>
);

LinksGroup.propTypes = {
  group: linksGroupShape.isRequired,
  onLinkClick: func.isRequired
};

export default LinksGroup;
