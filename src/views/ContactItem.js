import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { ActionCreatorGET } from '../store/ActionCreators/actionCreatorGET';
import { ActionCreator } from '../store/ActionCreators/actionCreator';
import { ADD_CONTACT } from '../store/actionTypes';
import { ContactById } from '../store/endPoints';
import Img from 'react-image';
import Loader from '../assets/images/loader.svg';
import AddContact from './AddContact';
import PageNotFound from '../views/PageNotFound';

const getItemFromList = (list, id) => {
  let ContactsArray = [];
  list.map((item) => ContactsArray.push(...item.list));
  const CurrentContact = ContactsArray.find((contact) => contact.id === id);
  return CurrentContact;
};

class ContactItem extends Component {
  state = { pageNotFound: false };
  componentDidMount = async () => {
    const { Contacts, dispatch, match } = this.props;
    const { id } = match.params;
    if (id !== 'new') {
      const CurrentContact = await getItemFromList(Contacts, id);
      if (!CurrentContact) {
        const resp = await dispatch(ActionCreatorGET(ContactById(id), ADD_CONTACT));
        if (resp.payload._meta.code !== 200) {
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
    // check contact item in strore
    const CurrentContact = getItemFromList(Contacts, id);
    if (!CurrentContact) {
      return <Img src={Loader} />;
    }
    const { first_name, last_name, dob, email, gender, phone, status, website } = CurrentContact;
    const avatar = CurrentContact._links.avatar.href;

    return (
      <div className="card">
        <Img src={avatar} alt="Avatar" loader={<img src={Loader} alt="" />} />
        <div className="container">
          <h2 children={`${first_name} ${last_name}`} />
          <p>
            <b children="Gender" />
            <span children={gender} />
          </p>
          <p>
            <b children="Phone" />
            <span children={phone} />
          </p>
          <p>
            <b children="Website" />
            <span children={website} />
          </p>
          <p>
            <b children="Status" />
            <span children={status} />
          </p>
          <p>
            <b children="Email" />
            <span children={email} />
          </p>
          <p>
            <b children="Date of birth" />
            <span children={dob} />
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { Contacts: state.Contacts };
};

export default connect(mapStateToProps)(ContactItem);
