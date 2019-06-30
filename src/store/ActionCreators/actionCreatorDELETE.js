// global requests class
import Request from "../request";

// create request
const DeleteData = api => {
  return Request.delete(api);
};

// action creator
export const ActionCreatorDELETE = api => {
  return dispatch => {
    return DeleteData(api)
      .then(resp => resp.json())
      .then(data => data);
  };
};
