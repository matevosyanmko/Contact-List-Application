import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// asssets
import IosOpenOutline from 'react-ionicons/lib/IosOpenOutline';
import IosCreateOutline from 'react-ionicons/lib/IosCreateOutline';
import IosCloseCircleOutline from 'react-ionicons/lib/IosCloseCircleOutline';
// utils
import { Image } from '../utils';

const Table = (props) => {
  const { thead, tbody, removeContact } = props;
  return (
    <table>
      <thead>
        <tr
          children={thead.map((item, key) => (
            <th children={item} key={key} />
          ))}
        />
      </thead>
      <tbody>
        {tbody.map((item, key) => (
          <tr key={key}>
            <td children={<Image src={item._links.avatar.href} />} />
            <td children={item.first_name} />
            <td children={item.last_name} />
            <td children={item.phone} />
            <td children={item.email} />
            <td children={item.website} />
            <td
              children={
                <Fragment>
                  <Link to={`/users/${item.id}`} children={<button type="button" children={<IosOpenOutline />} className="button_view" />} />
                  <Link to={`/users/${item.id}/edit`} children={<button type="button" children={<IosCreateOutline />} className="button_edit" />} />
                  <Link children={<button type="button" children={<IosCloseCircleOutline />} onClick={() => removeContact(item.id)} className="button_delete" />} />
                </Fragment>
              }
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
