import { func, arrayOf, shape } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import Form from "./Form";
import List from "./List";
import { Wrapper } from "./styled";

const Menu = ({ dishes, removeDish, addDish, t }) => (
  <Wrapper>
    <Flex mx={-3}>
      <Box width={1 / 2} px={3}>
        <Form {...{ addDish, t }} />
      </Box>
      <Box width={1 / 2} px={3}>
        <List {...{ dishes, removeDish, t }} />
      </Box>
    </Flex>
  </Wrapper>
);

Menu.propTypes = {
  t: func.isRequired,
  dishes: arrayOf(shape()).isRequired,
  removeDish: func.isRequired,
  addDish: func.isRequired
};

export default Menu;
