//  components
import ContactsList from '../views/ContactsList';
import ContactItem from '../views/ContactItem';
import AddContact from '../views/AddContact';
import EditContact from '../views/EditContact';

export const Routes = [
  { key: 1, name: 'Contacts List', path: '/page/:id', component: ContactsList },
  { key: 2, name: 'Contact Item', path: '/users/:id', component: ContactItem },
  { key: 3, name: 'Edit Contact', path: '/users/:id/edit', component: EditContact },
  { key: 4, name: 'Add Contact', path: '/users/new/', icon: 'appstore', component: AddContact }
];
