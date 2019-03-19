import { POST_PICTURE_REQUEST, DELETE_PICTURE_REQUEST } from "types/pictures";
import { getRelationships } from "./utils";

export const postPicture = (parentResource, id, photo) => ({
  type: POST_PICTURE_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/pictures`,
    data: {
      data: {
        type: "pictures",
        attributes: {
          photo,
          parent_resource: parentResource
        },
        relationships: getRelationships(parentResource, id)
      }
    }
  },
  meta: { thunk: true, id }
});

export const deletePicture = id => ({
  type: DELETE_PICTURE_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/pictures/${id}`
  },
  meta: { thunk: true, id }
});
