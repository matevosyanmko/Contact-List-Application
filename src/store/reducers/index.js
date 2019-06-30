import { combineReducers } from 'redux';
// data
import Contacts from './reducers/contacts';
import PageCount from './reducers/pageCount';

export default combineReducers({
  Contacts,
  PageCount
});
