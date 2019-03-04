import { func, arrayOf, shape, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { LoadingIndicator } from "components";
import Form from "./Form";
import List from "./List";
import { Wrapper } from "./styled";

const Menu = ({ dishes, removeDish, addDish, addPicture, t, loading }) => (
  <Wrapper>
    {loading ? (
      <LoadingIndicator />
    ) : (
      <Flex mx={-3}>
        <Box width={1 / 2} px={3}>
          <Form {...{ addDish, addPicture, t }} />
        </Box>
        <Box width={1 / 2} px={3}>
          <List {...{ dishes, removeDish, t, loading }} />
        </Box>
      </Flex>
    )}
  </Wrapper>
);

Menu.propTypes = {
  t: func.isRequired,
  dishes: arrayOf(shape()).isRequired,
  removeDish: func.isRequired,
  addDish: func.isRequired,
  addPicture: func.isRequired,
  loading: bool.isRequired
};

export default Menu;
