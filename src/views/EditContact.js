import React, { Component } from 'react';
// redux modules
import { connect } from 'react-redux';
import { ActionCreatorPUT } from '../store/ActionCreators/actionCreatorPUT';
import { ContactById } from '../store/endPoints';
import { UPDATE_CONTACT, ADD_CONTACT } from '../store/actionTypes';
import { ActionCreator } from '../store/ActionCreators/actionCreator';
import { ActionCreatorGET } from '../store/ActionCreators/actionCreatorGET';
// assets
import { toast } from 'react-toastify';
import PageNotFound from '../views/PageNotFound';
// utils
import { Label, GetValueByName, GetItemFromList, LoaderIcon } from '../utils';

class EditContact extends Component {
  state = { pageNotFound: false };
  componentDidMount = async () => {
    const { Contacts, dispatch, match } = this.props;
    const { id } = match.params;
    const CurrentContact = await GetItemFromList(Contacts, id);
    if (!CurrentContact) {
      const resp = await dispatch(ActionCreatorGET(ContactById(id), ADD_CONTACT));
      if (resp.payload._meta.code !== 200) {
        this.setState({ pageNotFound: true });
      }
    }
  };

  submit = (event) => {
    event.preventDefault();
    const data = {
      first_name: GetValueByName('first_name'),
      last_name: GetValueByName('last_name'),
      dob: GetValueByName('dob'),
      email: GetValueByName('email'),
      gender: GetValueByName('gender'),
      phone: GetValueByName('phone'),
      status: GetValueByName('status'),
      website: GetValueByName('website'),
      address: GetValueByName('address')
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
    const CurrentContact = GetItemFromList(Contacts, id);
    if (!CurrentContact) {
      return LoaderIcon;
    }
    const { first_name, last_name, dob, email, gender, phone, status, website, address } = CurrentContact;
    return (
      <form className="layout" onSubmit={this.submit}>
        <h4 children="Edit Contact" />
        <Label type="text" name="first_name" placeholder="First Name" defaultValue={first_name} />
        <Label type="text" name="last_name" placeholder="Last Name" defaultValue={last_name} />
        <Label type="radio" name="gender" placeholder="Gender" radioObject={{ first: { name: 'Male', value: 'male' }, second: { name: 'Female', value: 'female' } }} defaultValue={gender} />
        <Label type="email" name="email" placeholder="Email" defaultValue={email} />
        <Label type="phone" name="phone" placeholder="Phone" defaultValue={phone} />
        <Label type="url" name="website" placeholder="Website" defaultValue={website} />
        <Label type="radio" name="status" placeholder="Status" radioObject={{ first: { name: 'Active', value: 'active' }, second: { name: 'Inactive', value: 'inactive' } }} defaultValue={status} />
        <Label type="text" name="address" placeholder="Address" defaultValue={address} />
        <Label type="date" name="dob" placeholder="Date of birth" defaultValue={dob} />
        <button type="submit" children="Submit Changes" />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { Contacts: state.Contacts };
};

export default connect(mapStateToProps)(EditContact);
