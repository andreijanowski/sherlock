import { Field } from "react-final-form";
import { Error } from "../styled";

const TypesError = () => (
  <Field
    name="types"
    subscription={{ data: true }}
    render={({
      meta: {
        data: { error }
      }
    }) => (error ? <Error>{error}</Error> : null)}
  />
);

export default TypesError;
