import React from "react";
import { string } from "prop-types";

import Button from "components/styleguide/Button";

const CTAButton = ({ label, href, ...rest }) => (
  <Button
    as="a"
    target="_blank"
    href={href}
    rel="noreferrer noopener"
    withArrow
    {...rest}
  >
    {label}
  </Button>
);

CTAButton.propTypes = {
  label: string.isRequired,
  href: string.isRequired
};

export default CTAButton;
