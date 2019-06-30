import React from 'react';
import { Link } from 'react-router-dom';
import IosAdd from 'react-ionicons/lib/IosAdd';

const AddButton = (props) => <Link to="/users/new" children={<IosAdd color="white" fontSize="36px" />} className="Circle BottomRight" title="add contact" />;

export default AddButton;
