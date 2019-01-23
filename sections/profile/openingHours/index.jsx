import { func } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { H3 } from "components";
import arrayMutators from "final-form-arrays";
import { Form } from "../styled";
import Day from "./Day";

const weekdays = [1, 2, 3, 4, 5, 6, 0];

const OpeningHoursForm = ({ t }) => (
  <FinalForm
    onSubmit={v => console.log(v)}
    mutators={{ ...{ ...arrayMutators } }}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit} width={[1, 1, 1]} mx={0}>
        <H3>{t("openingHours")}</H3>
        {weekdays.map(weekday => (
          <Day {...{ t, weekday }} />
        ))}
      </Form>
    )}
  />
);

OpeningHoursForm.propTypes = {
  t: func.isRequired
};

export default OpeningHoursForm;
