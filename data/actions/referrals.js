import { POST_REFERRALS_REQUEST } from "types/referrals";

export const postReferrals = emails => ({
  type: POST_REFERRALS_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/referrals`,
    data: {
      data: {
        type: "referrals",
        attributes: {
          emails
        }
      }
    }
  },
  meta: { thunk: true }
});
