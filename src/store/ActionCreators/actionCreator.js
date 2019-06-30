// create dispatch object
const Dispatcher = (type, payload) => {
  return { type, payload };
};
// action creator
export const ActionCreator = (type, payload) => {
  return dispatch => {
    dispatch(Dispatcher(type, payload));
  };
};
