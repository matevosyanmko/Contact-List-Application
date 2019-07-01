import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { ActionCreatorGET } from '../store/ActionCreators/actionCreatorGET';
import { ADD_CONTACT } from '../store/actionTypes';
import { ContactById } from '../store/endPoints';
import AddContact from './AddContact';
import PageNotFound from '../views/PageNotFound';
import { GetItemFromList, InfoField, LoaderIcon, Image } from '../utils';

class ContactItem extends Component {
  state = { pageNotFound: false };
  componentDidMount = async () => {
    const { Contacts, dispatch, match } = this.props;
    const { id } = match.params;
    if (id !== 'new') {
      // check in item exists in store ,or make request
      const CurrentContact = await GetItemFromList(Contacts, id);
      if (!CurrentContact) {
        const resp = await dispatch(ActionCreatorGET(ContactById(id), ADD_CONTACT));
        if (resp.payload._meta.code !== 200) {
          // if item not found in back end ,show page not found
          this.setState({ pageNotFound: true });
        }
      }
    }
  };

  render() {
    const { pageNotFound } = this.state;
    const { Contacts, match } = this.props;
    const { id } = match.params;

    if (id === 'new') {
      return <AddContact />;
    }

    if (pageNotFound) {
      return <PageNotFound />;
    }
    const CurrentContact = GetItemFromList(Contacts, id);
    if (!CurrentContact) {
      return LoaderIcon;
    }
    const { first_name, last_name, dob, email, gender, phone, status, website } = CurrentContact;
    const avatar = CurrentContact._links.avatar.href;
    return (
      <div className="card layout">
        <Image src={avatar} />
        <div className="card_container">
          <h2 children={`${first_name} ${last_name}`} />
          <InfoField name="Gender" value={gender} />
          <InfoField name="Phone" value={phone} />
          <InfoField name="Website" value={website} />
          <InfoField name="Status" value={status} />
          <InfoField name="Email" value={email} />
          <InfoField name="Date" value={dob} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { Contacts: state.Contacts };
};

export default connect(mapStateToProps)(ContactItem);
