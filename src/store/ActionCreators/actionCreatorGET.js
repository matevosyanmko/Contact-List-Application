// global requests class
import Request from '../request';
// create request
const FetchData = (api) => {
  return Request.get(api);
};
// create dispatch object
const Dispatcher = (type, payload) => {
  return { type, payload };
};
// action creator
export const ActionCreatorGET = (api, type) => {
  return (dispatch) => {
    return FetchData(api)
      .then((resp) => resp.json())
      .then((data) => dispatch(Dispatcher(type, data)), (error) => error.message);
  };
};
