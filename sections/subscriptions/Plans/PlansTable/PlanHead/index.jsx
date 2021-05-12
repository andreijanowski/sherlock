import { Button } from "components";
import { noop } from "lodash";
import { func, string } from "prop-types";
import React, { useCallback } from "react";
import { Cnt, Label, Price } from "./styled";

const PlanHead = ({ button, color, label, price, onBtnClick }) => {
  const handleButtonClick = useCallback(() => {
    onBtnClick({ label });
  }, [label, onBtnClick]);

  return (
    <Cnt color={color}>
      <Label>{label}</Label>
      <Price>{price}</Price>
      <Button
        background={color}
        styleName="subscription"
        onClick={handleButtonClick}
      >
        {button}
      </Button>
    </Cnt>
  );
};

PlanHead.defaultProps = {
  button: "",
  color: "",
  label: "",
  price: "",
  onBtnClick: noop
};
PlanHead.propTypes = {
  button: string,
  color: string,
  label: string,
  price: string,
  onBtnClick: func
};

export default PlanHead;
