/* eslint-disable import/prefer-default-export */
import { PATCH_BUSINESS_REQUEST } from "types/businesses";

export const patchBusiness = (id, values) => ({
  type: PATCH_BUSINESS_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/businesses/${id}`,
    data: {
      data: {
        id,
        type: "businesses",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: { thunk: true }
});
