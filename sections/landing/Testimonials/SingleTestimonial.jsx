import React from "react";
import { Flex } from "@rebass/grid";
import { number, func } from "prop-types";
import {
  Avatar,
  ParagraphStyled,
  Name,
  Increase
} from "./SingleTestimonial.styled";

const SingleTestimonial = ({ index, t }) => {
  const translationKey = `testimonials.list.${index}`;
  return (
    <Flex p={3} flexDirection="column" alignItems="center" width={[1, 1 / 3]}>
      <Avatar i={index} />
      <Name>
        {`${t(`${translationKey}.position`)}, `}
        <span>{t(`${translationKey}.company`)}</span>
      </Name>
      <Increase app mb={3}>
        {t(`${translationKey}.increase`)}
      </Increase>
      <ParagraphStyled>“{t(`${translationKey}.quote`)}“</ParagraphStyled>
    </Flex>
  );
};

SingleTestimonial.propTypes = {
  index: number.isRequired,
  t: func.isRequired
};

export default SingleTestimonial;
