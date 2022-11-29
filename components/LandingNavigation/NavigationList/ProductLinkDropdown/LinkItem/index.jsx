import React from "react";
import { func } from "prop-types";

import Link from "components/Link";
import { useLng } from "utils/hooks";
import { Container, Description, IconContainer, Title } from "./styled";
import { linkShape } from "../types";

const LinkItem = ({
  link: { icon: Icon, title, description, href },
  onLinkClick
}) => {
  const lng = useLng();

  const wrapContent = content =>
    href ? (
      <Link route={href} lng="en">
        {content}
      </Link>
    ) : (
      content
    );

  const props = href
    ? {
        as: "a",
        onClick: e => {
          e.preventDefault();
          const fullPath = `/${lng}${href}`;
          onLinkClick(fullPath);
        }
      }
    : { as: "div" };

  return wrapContent(
    <Container width={["100%", null, null, 210, 285]} {...props}>
      <IconContainer>
        <Icon />
      </IconContainer>
      <Title mb="1px">{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

LinkItem.propTypes = {
  link: linkShape.isRequired,
  onLinkClick: func.isRequired
};

export default LinkItem;
