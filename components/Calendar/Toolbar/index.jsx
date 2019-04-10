import { string, func } from "prop-types";
import { Navigate } from "react-big-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Period, NavigationItem } from "./styled";

const Toolbar = ({ label, onNavigate }) => (
  <Period>
    {onNavigate && (
      <NavigationItem onClick={() => onNavigate(Navigate.PREVIOUS)}>
        <FontAwesomeIcon icon={["fa", "arrow-alt-circle-left"]} />
      </NavigationItem>
    )}
    {label}
    {onNavigate && (
      <NavigationItem onClick={() => onNavigate(Navigate.NEXT)}>
        <FontAwesomeIcon icon={["fa", "arrow-alt-circle-right"]} />
      </NavigationItem>
    )}
  </Period>
);

Toolbar.propTypes = {
  label: string.isRequired,
  onNavigate: func
};

Toolbar.defaultProps = {
  onNavigate: null
};

export default Toolbar;
