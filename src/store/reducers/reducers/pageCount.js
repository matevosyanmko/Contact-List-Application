import { SET_PAGE_COUNT } from '../../actionTypes';

export default (state = 0, action) => {
  const payload = action.payload;
  switch (action.type) {
    case SET_PAGE_COUNT:
      return payload;
    default:
      return state;
  }
};
