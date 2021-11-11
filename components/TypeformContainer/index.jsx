import React, { useEffect, useRef } from "react";
import { string } from "prop-types";
import { createWidget } from "@typeform/embed";
import "@typeform/embed/build/css/widget.css";

import { Container } from "./styled";

const TypeformContainer = ({ formId }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      try {
        createWidget(Buffer.from(formId, "base64"), {
          container: containerRef.current
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [formId]);
  return <Container ref={containerRef} />;
};

TypeformContainer.propTypes = {
  formId: string.isRequired
};

export default TypeformContainer;
