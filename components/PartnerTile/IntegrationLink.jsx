import React from "react";
import { arrayOf, node, oneOfType, shape } from "prop-types";

import { Link } from "./styled";

const IntegrationLink = ({ partner, children }) => (
  <Link
    href={partner.get("websiteUrl")}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </Link>
);

IntegrationLink.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  children: node.isRequired
};

export default IntegrationLink;
