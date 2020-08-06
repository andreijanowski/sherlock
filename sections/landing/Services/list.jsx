import { Flex, Box } from "@rebass/grid";
import { func } from "prop-types";
import { Service, ServiceIcon } from "./styled";

const iconsNames = [
  "bookings",
  "delivery",
  "take-away",
  "restaurants",
  "privatization",
  "caterings",
  "analytics",
  "le-food",
  "marketing",
  "salad-bar",
  "billing",
  "rooftop"
];

const List = ({ t }) => {
  const listLength = t("services.list.length");
  const listArray = [];
  for (let i = 0; i < listLength; i += 1) {
    const serviceName = t(`services.list.${i}`);

    listArray.push(
      <Box width={[1 / 2, 1 / 4, 1 / 6, 1 / 6]} p={2} key={serviceName}>
        <Service>
          <ServiceIcon name={iconsNames[i]} />
          <span
            css={{
              whiteSpace: "pre-wrap"
            }}
          >
            {serviceName}
          </span>
        </Service>
      </Box>
    );
  }
  return (
    <Flex my={5} mx={2} flexWrap="wrap">
      {listArray}
    </Flex>
  );
};

List.propTypes = {
  t: func.isRequired
};

export default List;
