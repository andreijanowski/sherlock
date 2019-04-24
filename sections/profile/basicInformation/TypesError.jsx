import { Field } from "react-final-form";
import { Error } from "components/Form/styled";
import { getError } from "components/Form/utils";
import { bool } from "prop-types";
import { Box } from "@rebass/grid";

const TypesError = ({ isErrorVisibilityRequired }) => (
  <Field
    name="types"
    subscription={{ error: true, data: true, touched: true }}
    render={({ meta }) => {
      const error = getError(meta, isErrorVisibilityRequired);
      return error ? (
        <Error>
          <Box ml={2}>{error}</Box>
        </Error>
      ) : null;
    }}
  />
);

TypesError.propTypes = {
  isErrorVisibilityRequired: bool
};

TypesError.defaultProps = {
  isErrorVisibilityRequired: false
};

export default TypesError;
