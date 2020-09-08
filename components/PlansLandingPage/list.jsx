import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Service, Design, Tooltip, Badge } from "./styled";
import { generatePlanOptionsList } from "./utils";

const List = ({ t, name: listName, color }) =>
  generatePlanOptionsList(listName, t).map(
    ({ name, isHighlighted, isLighter, tooltipImage, discount }) => {
      const item = (
        <Service
          key={name}
          {...{ isHighlighted, isLighter, tooltipImage }}
          justifyContent={["center", "flex-start"]}
        >
          {name}
          {discount && <Badge color={color}>{discount}</Badge>}
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
