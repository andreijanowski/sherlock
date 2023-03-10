import { string, shape, func } from "prop-types";

import { Checkbox } from "./styled";

const ServiceStatusCheckbox = ({
  t,
  serviceActivationFieldName,
  business,
  updateBusiness,
  businessId
}) => (
  <Checkbox
    hasCloserText
    label={t("app:active")}
    input={{
      onChange: ({ target: { name, checked } }) =>
        updateBusiness(businessId, { [name]: checked }, true),
      value: !!(business && business.get(serviceActivationFieldName)),
      checked: !!(business && business.get(serviceActivationFieldName)),
      name: serviceActivationFieldName,
      type: "checkbox"
    }}
  />
);

ServiceStatusCheckbox.propTypes = {
  t: func.isRequired,
  serviceActivationFieldName: string.isRequired,
  business: shape().isRequired,
  updateBusiness: func.isRequired,
  businessId: string.isRequired
};

export default ServiceStatusCheckbox;
