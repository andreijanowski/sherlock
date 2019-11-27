import React from "react";
import { Flex, Box } from "@rebass/grid";
import { func } from "prop-types";
import { H2 } from "components";
import SingleTestimonial from "./SingleTestimonial";

const Testimonials = ({ t }) => {
  const renderTestimonials = () => {
    const list = [];
    for (let i = 0; i < t("testimonials.list.length"); i += 1) {
      list.push(<SingleTestimonial index={i} t={t} />);
    }
    return list;
  };

  return (
    <Box mt={[0, 5]}>
      <H2>{t("testimonials.header")}</H2>
      <Flex flexWrap="wrap" m={-3}>
        {renderTestimonials()}
      </Flex>
    </Box>
  );
};

Testimonials.propTypes = {
  t: func.isRequired
};

export default Testimonials;
