import { FETCH_INTELLIGENCE_NOTIFICATIONS_REQUEST } from "types/intelligence";

const PER_PAGE = 100;

export const getIntelligenceNotifications = (
  businessId,
  page = 1,
  notificationType,
  countryCode,
  sort
) => ({
  type: FETCH_INTELLIGENCE_NOTIFICATIONS_REQUEST,
  payload: {
    endpoint: `/api/v1/intelligence_notifications?business_uuid=${businessId}&page=${page}&per_page=${PER_PAGE}`,
    params: {
      notification_type: notificationType,
      country_codes: countryCode,
      sort
    }
  },
  meta: { thunk: true, page }
});
