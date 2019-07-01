import React, { Component } from 'react';
// redux module
import { connect } from 'react-redux';
import { ActionCreatorPOST } from '../store/ActionCreators/actionCreatorPOST';
import { ActionCreator } from '../store/ActionCreators/actionCreator';
import { ContactCreate } from '../store/endPoints';
import { ADD_CONTACT } from '../store/actionTypes';
//
import { toast } from 'react-toastify';
import { Label, CollectData } from '../utils';
import { ContactData } from '../constants/data';

class AddContact extends Component {
  submit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const data = CollectData(ContactData);
    const response = dispatch(ActionCreatorPOST(ContactCreate, data));
    response
      .then((data) => data.json())
      .then((r) => {
        if (r._meta.code !== 200) {
          toast.error(r.result[0].message);
        } else if (r._meta.code === 200) {
          toast.success(r._meta.message);
          dispatch(ActionCreator(ADD_CONTACT, r));
        }
      });
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
