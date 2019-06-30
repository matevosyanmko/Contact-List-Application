import React from 'react';
import Img from 'react-image';
import Loader from '../assets/images/loader.svg';

export const GetValueByName = (name) => {
  if (name === 'status' || name === 'gender') {
    return document.querySelector(`input[name='${name}']:checked`).value;
  } else {
    return document.getElementsByName(name)[0].value;
  }
};

export const GetItemFromList = (list, id) => {
  let ContactsArray = [];
  list.map((item) => ContactsArray.push(...item.list));
  const CurrentContact = ContactsArray.find((contact) => contact.id === id);
  return CurrentContact;
};

export const InfoField = (props) => {
  const { name, value } = props;
  return (
    <p>
      <b children={name} />
      <span children={value} />
    </p>
  );
};

export const Image = (props) => {
  const { src, alt } = props;
  return <Img src={src} alt={alt ? alt : ''} loader={<img src={Loader} alt="" />} style={{ display: 'block', margin: 'auto' }} />;
};

export const LoaderIcon = <Image src={Loader} />;

export const Label = (props) => {
  const { placeholder, type, name, radioObject, defaultValue } = props;
  return type === 'radio' ? (
    <label>
      <p children={placeholder} />
      <div className="inline_radio">
        <p>
          {radioObject.first.name} <input type={type} name={name} value={radioObject.first.value} defaultChecked={defaultValue === radioObject.first.value} required />
        </p>
        <p>
          {radioObject.second.name} <input type={type} name={name} value={radioObject.second.value} required defaultChecked={defaultValue === radioObject.second.value} />
        </p>
      </div>
    </label>
  ) : (
    <label>
      {placeholder}
      <input type={type} name={name} required defaultValue={defaultValue} />
    </label>
  );
};
