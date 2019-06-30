// global requests class
import Request from "../request";
// fetch function
const PutData = (api, data) => {
  return Request.put(api, data);
};

// action creator
export const ActionCreatorPUT = (api, data) => {
  return dispatch => {
    return PutData(api, data).then(data => data, error => error.message);
  };
};
