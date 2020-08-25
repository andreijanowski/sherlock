import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Service, Design, Tooltip } from "./styled";
import { generatePlanOptionsList } from "./utils";

const List = ({ t, name: listName }) =>
  generatePlanOptionsList(listName, t).map(
    ({ name, isHighlighted, isLighter, tooltipImage }) => {
      const item = (
        <Service
          key={name}
          {...{ isHighlighted, isLighter, tooltipImage }}
          justifyContent={["center", "flex-start"]}
        >
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
