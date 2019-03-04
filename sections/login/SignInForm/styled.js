import styled from "styled-components";
import { Paragraph, Button } from "components";

export const SuccessMessageWrapper = styled(Paragraph)`
  max-width: 558px;
  text-align: center;
  margin: 0 auto;
`;

export const FormContainer = styled.form`
  position: relative;
  width: 100%;
  max-width: 558px;
  ${Button} {
    width: 100%;
  }
`;
