import * as _ from "lodash";

export const groupServiceLinksByCategory = serviceLinks =>
  _.groupBy(
    Object.values(serviceLinks.toJS()),
    item => item.attributes.category
  );
