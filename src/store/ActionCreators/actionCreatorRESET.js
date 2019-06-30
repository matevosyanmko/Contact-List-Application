// create dispatch object
const Dispatcher = (type, payload) => {
  return { type, payload };
};
// action creator
export const ActionCreatorRESET = types => {
  return dispatch => {
    types.map(type => dispatch(Dispatcher(type, null)));
  };
};
