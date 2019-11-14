import React from "react";
import { Flex } from "@rebass/grid";
import { Paragraph } from "components";
import { number, func } from "prop-types";
import { Avatar, ParagraphStyled, Name } from "./SingleTestimonial.styled";

const SingleTestimonial = ({ index, t }) => {
  const translationKey = `testimonials.list.${index}`;
  return (
    <Flex p={3} flexDirection="column" alignItems="center" width={[1, 1 / 3]}>
      <Avatar />
      <Name>
        {`${t(`${translationKey}.position`)}, `}
        <span>{t(`${translationKey}.company`)}</span>
      </Name>
      <Paragraph app mb={3}>
        {t(`${translationKey}.increase`)}
      </Paragraph>
      <ParagraphStyled>“{t(`${translationKey}.quote`)}“</ParagraphStyled>
    </Flex>
  );
};

SingleTestimonial.propTypes = {
  index: number.isRequired,
  t: func.isRequired
};

export default SingleTestimonial;
