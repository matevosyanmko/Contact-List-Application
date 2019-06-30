import React, { Component } from 'react';
// redux module
import { connect } from 'react-redux';
import { ActionCreatorPOST } from '../store/ActionCreators/actionCreatorPOST';
import { ContactCreate } from '../store/endPoints';
//
import { toast } from 'react-toastify';
import { Label, GetValueByName } from '../utils';

class AddContact extends Component {
  submit = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
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
    const response = dispatch(ActionCreatorPOST(ContactCreate, data));
    response.then((data) => data.json()).then((r) => (r._meta.code !== 200 ? toast.error(r.result[0].message) : toast.success(r._meta.message)));
  };
  render() {
    return (
      <form className="layout" onSubmit={this.submit}>
        <h4 children="Add Contact" />
        <Label type="text" name="first_name" placeholder="First Name" />
        <Label type="text" name="last_name" placeholder="Last Name" />
        <Label type="radio" name="gender" placeholder="Gender" radioObject={{ first: { name: 'Male', value: 'male' }, second: { name: 'Female', value: 'female' } }} />
        <Label type="email" name="email" placeholder="Email" />
        <Label type="phone" name="phone" placeholder="Phone" />
        <Label type="url" name="website" placeholder="Website" />
        <Label type="radio" name="status" placeholder="Status" radioObject={{ first: { name: 'Active', value: 'active' }, second: { name: 'Inactive', value: 'inactive' } }} />
        <Label type="text" name="address" placeholder="Address" />
        <Label type="date" name="dob" placeholder="Date of birth" />
        <button type="submit" children="Submit" />
      </form>
    );
  }
}

export default connect()(AddContact);
