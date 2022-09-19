import React, { useRef } from "react";
import { string } from "prop-types";
import { Widget } from "@typeform/embed-react";
import "@typeform/embed/build/css/widget.css";

import { Container } from "./styled";

const TypeformContainer = ({ formId }) => {
  const containerRef = useRef(null);
  return (
    <Container ref={containerRef}>
      <Widget
        id={formId}
        style={{ height: "500px", width: "100%" }}
        className="my-form"
      />
    </Container>
  );
};

TypeformContainer.propTypes = {
  formId: string.isRequired
};

export default TypeformContainer;
