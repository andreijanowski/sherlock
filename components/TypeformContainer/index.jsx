import React, { useEffect, useRef } from "react";
import { string } from "prop-types";
import { createWidget } from "@typeform/embed";
import "@typeform/embed/build/css/widget.css";

import { Container } from "./styled";

const TypeformContainer = ({ formId }) => {
  const containerRef = useRef(null);
  console.log(formId);
  useEffect(() => {
    if (containerRef.current) {
      createWidget(formId, { container: containerRef.current });
    }
  }, [formId]);
  return <Container ref={containerRef} />;
};

TypeformContainer.propTypes = {
  formId: string.isRequired
};

export default TypeformContainer;
