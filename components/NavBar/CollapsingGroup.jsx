import React, { useState, useCallback } from "react";
import { node, string } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import {
  CollapsingGroupToggle,
  CollapsingGroupContent,
  CollapsingGroupTitle
} from "./styled";

const CollapsingGroup = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleState = useCallback(() => {
    setIsCollapsed(prevCollapsed => !prevCollapsed);
  }, []);

  return (
    <li>
      <CollapsingGroupToggle onClick={toggleState}>
        <CollapsingGroupTitle mr={2}>{title}</CollapsingGroupTitle>
        <FontAwesomeIcon icon={isCollapsed ? faChevronDown : faChevronUp} />
      </CollapsingGroupToggle>
      <CollapsingGroupContent>
        {!isCollapsed && children}
      </CollapsingGroupContent>
    </li>
  );
};

CollapsingGroup.propTypes = {
  title: string.isRequired,
  children: node.isRequired
};

export default CollapsingGroup;
