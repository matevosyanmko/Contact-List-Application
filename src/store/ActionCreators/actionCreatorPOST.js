// global requests class
import Request from '../request';

// fetch function
const PostData = (api, data) => {
  return Request.post(api, data);
};

// action creator
export const ActionCreatorPOST = (api, data) => {
  return (dispatch) => {
    return PostData(api, data).then((data) => data, (error) => error.message);
  };
};
