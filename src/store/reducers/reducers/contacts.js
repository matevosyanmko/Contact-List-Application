import { ADD_CONTACT_GROUP, UPDATE_CONTACT, DELETE_CONTACT, ADD_CONTACT } from '../../actionTypes';

export default (state = [], action) => {
  const payload = action.payload;
  switch (action.type) {
    case ADD_CONTACT_GROUP:
      return state.find((item) => item.pageNumber === payload._meta.currentPage) ? state : [...state, { pageNumber: payload._meta.currentPage, list: payload.result }];
    case UPDATE_CONTACT:
      return state.map((data) => {
        return { ...data, list: [...data.list.map((item) => (item.id === payload.id ? { ...item, ...payload } : item))] };
      });
    case ADD_CONTACT:
      return [...state, { pageNumber: 'custom', list: [payload.result] }];
    case DELETE_CONTACT:
      return state.map((data) => {
        return { ...data, list: data.list.filter((item) => item.id !== payload) };
      });
    // return state.filter((item) => item.id !== payload);
    default:
      return state;
  }
};
