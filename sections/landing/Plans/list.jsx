import { Service, Badge } from "./styled";
import { generatePlanOptionsList } from "./utils";

const List = ({ t, name: listName, color }) => {
  const list = generatePlanOptionsList(listName, t);
  return list.map(({ name, isHighlighted, isLighter, discount }) => (
    <Service key={name} {...{ isHighlighted, isLighter }}>
      {discount && <Badge color={color}>{discount}</Badge>}
      {name}
    </Service>
  ));
};

export default List;
