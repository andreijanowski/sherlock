import { func, shape, bool, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { LoadingIndicator } from "components";
import Form from "./Form";
import List from "./List";
import { Wrapper } from "./styled";
import { getInitialValues } from "./utils";

const Widgets = ({
  widgets,
  removeWidget,
  addWidget,
  setEditedWidgetId,
  editedWidgetId,
  t,
  loading
}) => {
  const { initialValues, apiKey } = getInitialValues({
    editedWidgetId,
    widgets
  });

  return (
    <Wrapper>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Flex mx={-3} flexDirection="column">
          <Box width={1} px={3}>
            <Form
              {...{
                addWidget,
                initialValues,
                apiKey,
                setEditedWidgetId,
                t
              }}
            />
          </Box>
          <Box width={1} px={3}>
            <List
              {...{ widgets, removeWidget, t, loading, setEditedWidgetId }}
            />
          </Box>
        </Flex>
      )}
    </Wrapper>
  );
};

Widgets.propTypes = {
  t: func.isRequired,
  widgets: shape(),
  setEditedWidgetId: func.isRequired,
  removeWidget: func.isRequired,
  addWidget: func.isRequired,
  loading: bool.isRequired,
  editedWidgetId: string
};

Widgets.defaultProps = {
  widgets: null,
  editedWidgetId: null
};

export default Widgets;
