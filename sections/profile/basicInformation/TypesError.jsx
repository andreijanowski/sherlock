import { Field } from "react-final-form";
import { Error } from "components/Form/styled";
import { getError } from "components/Form/utils";
import { bool } from "prop-types";
import { Box } from "@rebass/grid";

const TypesError = ({ forceShowError }) => (
  <Field
    name="types"
    subscription={{ error: true, data: true }}
    render={({ meta }) => {
      const error = getError(meta, forceShowError);
      return error ? (
        <Error>
          <Box ml={2}>{error}</Box>
        </Error>
      ) : null;
    }}
  />
);

TypesError.propTypes = {
  forceShowError: bool
};

TypesError.defaultProps = {
  forceShowError: false
};

export default TypesError;
