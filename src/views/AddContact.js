import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorPOST } from '../store/ActionCreators/actionCreatorPOST';
import { ContactCreate } from '../store/endPoints';
import { UPDATE_CONTACT, ADD_CONTACT } from '../store/actionTypes';
import { ActionCreator } from '../store/ActionCreators/actionCreator';
import { toast } from 'react-toastify';

const Label = (props) => {
  const { placeholder, type, name, radioObject } = props;
  return type === 'radio' ? (
    <label>
      {placeholder}
      <div className="inline_radio">
        <p>
          {radioObject.first.name} <input type={type} name={name} value={radioObject.first.value} required />
        </p>
        <p>
          {radioObject.second.name} <input type={type} name={name} value={radioObject.second.value} required />
        </p>
      </div>
    </label>
  ) : (
    <label>
      {placeholder}
      <input type={type} name={name} required />
    </label>
  );
};

class AddContact extends Component {
  getValue = (name) => {
    if (name === 'status' || name === 'gender') {
      return document.querySelector(`input[name='${name}']:checked`).value;
    } else {
      return document.getElementsByName(name)[0].value;
    }
  };

  submit = async (event) => {
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
    const response = dispatch(ActionCreatorPOST(ContactCreate, data));
    response
      .then((data) => data.json())
      .then((r) => {
        if (r._meta.code !== 200) {
          toast.error(r.result[0].message);
        } else {
          toast.success(r._meta.message);
        }
      });
    // repsonse
    // /      .then((data) => data.json())
    //   .then((e) => {
    // if (e._meta.code === 200) {
    //   dispatch(ActionCreator(UPDATE_CONTACT, e.result));
    // }
    //   });
  };
  render() {
    console.log(this.props);
    return (
      <form className="editForm" onSubmit={this.submit}>
        <h4 children="Add Contact" />
        <Label type="text" name="first_name" placeholder="First Name" />
        <Label type="text" name="last_name" placeholder="Last Name" />
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
