import { IntegrationHub, Pocket, Timer } from "icons";

export const INTEGRATIONS_FILTERS = {
  ALL: "all",
  AVAILABLE: "available",
  COMING_SOON: "coming_soon"
};

export const filters = [
  { name: INTEGRATIONS_FILTERS.ALL, icon: <IntegrationHub /> },
  { name: INTEGRATIONS_FILTERS.AVAILABLE, icon: <Pocket /> },
  { name: INTEGRATIONS_FILTERS.COMING_SOON, icon: <Timer /> }
];
