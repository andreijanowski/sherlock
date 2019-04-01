import { Service, Badge } from "./styled";
import { generatePlanOptionsList } from "./utils";

const List = ({ t, name: listName, color }) =>
  generatePlanOptionsList(listName, t).map(
    ({ name, isHighlighted, isLighter, discount }) => (
      <Service key={name} {...{ isHighlighted, isLighter }}>
        {discount && <Badge color={color}>{discount}</Badge>}
        {name}
      </Service>
    )
  );

export default List;
