import { Flex, Box } from "@rebass/grid";
import { func } from "prop-types";
import { Service } from "./styled";

const List = ({ t }) => {
  const listLength = t("services.list.length");
  const listArray = [];
  for (let i = 0; i < listLength; i += 1) {
    const serviceName = t(`services.list.${i}`);
    listArray.push(
      <Box width={1 / 4} key={serviceName}>
        <Service>{serviceName}</Service>
      </Box>
    );
  }
  return (
    <Flex m={-2} flexWrap="wrap">
      {listArray}
    </Flex>
  );
};

List.propTypes = {
  t: func.isRequired
};

export default List;
