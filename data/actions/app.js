import {
  PATH_CHANGED,
  SET_CURRENT_BUSINESS,
  SET_CURRENT_USER_ID,
  SET_INSTANCE_UUID
} from "types/app";

export const pathChanged = path => ({
  type: PATH_CHANGED,
  payload: { path }
});

export const setCurrentBusiness = id => ({
  type: SET_CURRENT_BUSINESS,
  payload: {
    id
  }
});

export const saveCurrentUserId = id => ({
  type: SET_CURRENT_USER_ID,
  payload: {
    id
  }
});

export const setInstanceUuid = uuid => ({
  type: SET_INSTANCE_UUID,
  payload: {
    uuid
  }
});
