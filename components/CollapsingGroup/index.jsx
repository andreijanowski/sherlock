import React, { useState, useCallback } from "react";
import { node, string } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import {
  CollapsingGroupContainer,
  CollapsingGroupToggle,
  CollapsingGroupContent,
  CollapsingGroupTitle
} from "./styled";

const CollapsingGroup = ({ title, children, as }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleState = useCallback(() => {
    setIsCollapsed(prevCollapsed => !prevCollapsed);
  }, []);

  return (
    <CollapsingGroupContainer as={as}>
      <CollapsingGroupToggle onClick={toggleState}>
        <CollapsingGroupTitle mr={2}>{title}</CollapsingGroupTitle>
        <FontAwesomeIcon icon={isCollapsed ? faChevronDown : faChevronUp} />
      </CollapsingGroupToggle>
      <CollapsingGroupContent>
        {!isCollapsed && children}
      </CollapsingGroupContent>
    </CollapsingGroupContainer>
  );
};

CollapsingGroup.propTypes = {
  as: string,
  title: string.isRequired,
  children: node.isRequired
};

CollapsingGroup.defaultProps = {
  as: "li"
};

export default CollapsingGroup;
