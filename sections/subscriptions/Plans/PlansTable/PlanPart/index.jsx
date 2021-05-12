import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayOf, element, node, shape, string } from "prop-types";
import React from "react";
import { Tr, TrHead, SvgIconWrap } from "./styled";

const tick = (
  <SvgIconWrap>
    <FontAwesomeIcon icon={faCheck} />
  </SvgIconWrap>
);

const PlanPart = ({ heading, items }) => (
  <>
    <TrHead>
      <td className="cell" colSpan="5">
        {heading}
      </td>
    </TrHead>
    {items.map(({ essential, free, icon, label, premium }) => (
      <Tr key={label}>
        <td className="planPartCell">
          <span className="icon">{icon}</span>
        </td>
        <td className="label planPartCell">{label}</td>
        <td className="planPartCell free">{free || tick}</td>
        <td className="planPartCell essential">{essential || tick}</td>
        <td className="planPartCell premium">{premium || tick}</td>
      </Tr>
    ))}
  </>
);

PlanPart.defaultProps = {
  heading: "",
  items: []
};
PlanPart.propTypes = {
  heading: string,
  items: arrayOf(
    shape({
      essential: node,
      free: node,
      icon: element,
      label: string,
      premium: node
    })
  )
};

export default PlanPart;
