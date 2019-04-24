import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Service, Badge, Design, Tooltip } from "./styled";
import { generatePlanOptionsList } from "./utils";

const List = ({ t, name: listName, color }) =>
  generatePlanOptionsList(listName, t).map(
    ({ name, isHighlighted, isLighter, discount, tooltipImage }) => {
      const item = (
        <Service key={name} {...{ isHighlighted, isLighter, tooltipImage }}>
          {discount && <Badge color={color}>{discount}</Badge>}
          {name}
          {tooltipImage && (
            <>
              {" "}
              <FontAwesomeIcon icon={["fa", "eye"]} />
            </>
          )}
        </Service>
      );
      return tooltipImage ? (
        <Tooltip key={name} content={<Design src={tooltipImage} />}>
          {item}
        </Tooltip>
      ) : (
        item
      );
    }
  );

export default List;
