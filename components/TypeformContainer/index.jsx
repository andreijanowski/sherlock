import React, { useEffect, useRef } from "react";
import { string } from "prop-types";
import { createWidget } from "@typeform/embed";
import { Widget } from "@typeform/embed-react";
import "@typeform/embed/build/css/widget.css";

import { Container } from "./styled";

const TypeformContainer = ({ formId }) => {
  const containerRef = useRef(null);
  console.log("REF", containerRef, formId);
  useEffect(() => {
    if (containerRef.current) {
      try {
        createWidget(Buffer.from(formId, "base64"), {
          container: containerRef.current
        });
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }, [formId]);
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
