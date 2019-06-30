import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { ActionCreatorPUT } from '../store/ActionCreators/actionCreatorPUT';
import { ContactById } from '../store/endPoints';
import { UPDATE_CONTACT, ADD_CONTACT } from '../store/actionTypes';
import { ActionCreator } from '../store/ActionCreators/actionCreator';
import { ActionCreatorGET } from '../store/ActionCreators/actionCreatorGET';
import Img from 'react-image';
import Loader from '../assets/images/loader.svg';
import PageNotFound from '../views/PageNotFound';

const getItemFromList = (list, id) => {
  let ContactsArray = [];
  list.map((item) => ContactsArray.push(...item.list));
  const CurrentContact = ContactsArray.find((contact) => contact.id === id);
  return CurrentContact;
};

class EditContact extends Component {
  state = { pageNotFound: false };
  componentDidMount = async () => {
    const { Contacts, dispatch, match } = this.props;
    const { id } = match.params;
    const CurrentContact = await getItemFromList(Contacts, id);
    if (!CurrentContact) {
      const resp = await dispatch(ActionCreatorGET(ContactById(id), ADD_CONTACT));
      if (resp.payload._meta.code !== 200) {
        this.setState({ pageNotFound: true });
      }
    }
  };
  getValue = (name) => {
    if (name === 'status' || name === 'gender') {
      return document.querySelector(`input[name='${name}']:checked`).value;
    } else {
      return document.getElementsByName(name)[0].value;
    }
  };

  submit = (event) => {
    event.preventDefault();
    const data = {
      first_name: this.getValue('first_name'),
      last_name: this.getValue('last_name'),
      dob: this.getValue('dob'),
      email: this.getValue('email'),
      gender: this.getValue('gender'),
      phone: this.getValue('phone'),
      status: this.getValue('status'),
      website: this.getValue('website'),
      address: this.getValue('address')
    };
    console.log(data);
    const { dispatch, match } = this.props;
    const { id } = match.params;
    const repsonse = dispatch(ActionCreatorPUT(ContactById(id), data));
    repsonse
      .then((data) => data.json())
      .then((e) => {
        if (e._meta.code === 200) {
          dispatch(ActionCreator(UPDATE_CONTACT, e.result));
          toast.success(e._meta.message);
        } else {
          toast.error(e._meta.message);
        }
      });
  };
  render() {
    const { Contacts, match } = this.props;
    const { pageNotFound } = this.state;
    const { id } = match.params;
    if (pageNotFound) {
      return <PageNotFound />;
    }
    // check contact item in strore
    const CurrentContact = getItemFromList(Contacts, id);
    if (!CurrentContact) {
      return <Img src={Loader} />;
    }
    // const CurrentContact = ContactsArray.find((contact) => contact.id === id);
    const { first_name, last_name, dob, email, gender, phone, status, website, address } = CurrentContact;
    const avatar = CurrentContact._links.avatar.href;

    return (
      <form className="editForm" onSubmit={this.submit}>
        <h4 children="Edit Contact" />
        <label>
          First Name
          <input defaultValue={first_name} type="text" name="first_name" />
        </label>
        <label>
          Last Name
          <input defaultValue={last_name} type="text" name="last_name" />
        </label>
        <label>
          Gender
          <div className="inline_radio">
            <p>
              Male <input type="radio" name="gender" value="male" defaultChecked={gender === 'male'} />
            </p>
            <p>
              Female
              <input type="radio" name="gender" value="female" defaultChecked={gender === 'female'} />{' '}
            </p>
          </div>
        </label>

        <label>
          Email
          <input defaultValue={email} type="email" name="email" />
        </label>

        <label>
          Phone
          <input defaultValue={phone} type="phone" name="phone" />
        </label>
        <label>
          Website
          <input defaultValue={website} type="url" name="website" />
        </label>
        <label>
          Status
          <div className="inline_radio">
            <p>
              active <input type="radio" name="status" value="active" defaultChecked={status === 'active'} />
            </p>
            <p>
              inactive
              <input type="radio" name="status" value="inactive" defaultChecked={status === 'inactive'} />{' '}
            </p>
          </div>
        </label>

        <label>
          Address
          <input defaultValue={address} type="text" name="address" />
        </label>
        <label>
          Date of birth
          <input defaultValue={dob} type="date" name="dob" />
        </label>

        <button type="submit" children="Submit Changes" />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { Contacts: state.Contacts };
};

export default connect(mapStateToProps)(EditContact);
