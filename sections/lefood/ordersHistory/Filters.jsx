import { Form as FinalForm, Field } from "react-final-form";
import {
  FormDaypicker,
  StyledButton,
  H3,
  FormMultipleSelect
} from "components";
import { Box } from "@rebass/grid";
import { func, shape } from "prop-types";
import { FiltersForm } from "./styled";

const Filters = ({ t, onFilterSubmit, filter }) => (
  <FinalForm
    onSubmit={onFilterSubmit}
    initialValues={{ ...filter, states: filter.states || [] }}
    render={({ handleSubmit }) => (
      <FiltersForm onSubmit={handleSubmit}>
        <H3>{t("filters")}</H3>
        <FormDaypicker
          name="day"
          arePastDaysDisabled={false}
          label={t("day")}
          withCleanButton
        />
        <Box mb={3} width={[1, 1, 1 / 3, 1 / 3, 1]}>
          <Field
            name="states"
            placeholder={t("states")}
            component={FormMultipleSelect}
            items={[
              {
                label: t("waiting_for_approval"),
                value: "waiting_for_approval"
              },
              {
                label: t("waiting_for_payment"),
                value: "waiting_for_payment"
              },
              { label: t("paid"), value: "paid" },
              { label: t("in_preparation"), value: "in_preparation" },
              { label: t("in_delivery"), value: "in_delivery" },
              { label: t("completed"), value: "completed" },
              { label: t("canceled"), value: "canceled" },
              { label: t("rejected"), value: "rejected" }
            ]}
          />
        </Box>
        <Box mb={3}>
          <StyledButton styleName="formBlue" type="submit" fluid>
            {t("filter")}
          </StyledButton>
        </Box>
      </FiltersForm>
    )}
  />
);

Filters.propTypes = {
  t: func.isRequired,
  onFilterSubmit: func.isRequired,
  filter: shape().isRequired
};

export default Filters;
