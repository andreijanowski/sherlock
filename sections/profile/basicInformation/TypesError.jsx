import { Field } from "react-final-form";
import { Error } from "../styled";

const TypesError = () => (
  <Field
    name="types"
    subscription={{ error: true, data: true }}
    render={({
      meta: {
        error,
        data: { error: dataError }
      }
    }) => (error || dataError ? <Error>{error || dataError}</Error> : null)}
  />
);

export default TypesError;
