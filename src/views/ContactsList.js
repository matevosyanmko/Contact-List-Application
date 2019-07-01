import React, { PureComponent, Fragment } from 'react';
// redux modules
import { connect } from 'react-redux';
import { ActionCreatorGET } from '../store/ActionCreators/actionCreatorGET';
import { ActionCreatorDELETE } from '../store/ActionCreators/actionCreatorDELETE';
import { ActionCreator } from '../store/ActionCreators/actionCreator';
import { FindContactsByPage, ContactById } from '../store/endPoints';
import { DELETE_CONTACT, ADD_CONTACT_GROUP } from '../store/actionTypes';
//  components
import Pagination from '../components/Pagination';
import PageNumber from '../components/PageNumber';
import AddButton from '../components/AddButton';
import Table from '../components/Table';
// assets
import { toast } from 'react-toastify';
import { LoaderIcon } from '../utils';

const TableHeaderCols = ['Avatar', 'First name', 'Last name', 'Phone', 'Email', 'Website', 'Actions'];

class ContactsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { page: props.match.params.id };
  }
  componentDidMount() {
    this.getContacts();
  }
  static getDerivedStateFromProps = (nextProps, prevState) => {
    // on new page change
    if (nextProps.match.params.id !== prevState.page) {
      return { page: nextProps.match.params.id };
    } else {
      return null;
    }
  };

  componentDidUpdate(prevState) {
    if (this.props.match.params.id !== prevState.page) {
      this.getContacts();
    }
  }
  onPageChange = (page) => {
    this.setState({ page });
  };
  getContacts = async () => {
    const { dispatch, Contacts } = this.props;
    const { page } = this.state;
    // check if data exist or not
    if (!Contacts.find((item) => Number(item.pageNumber) === Number(page))) {
      const response = dispatch(ActionCreatorGET(FindContactsByPage(page), ADD_CONTACT_GROUP));
      // update page count after every request
      response.then((data) => dispatch(ActionCreator('SET_PAGE_COUNT', data.payload._meta.pageCount)));
    }
  };
  removeContact = async (id) => {
    const { dispatch } = this.props;
    const response = await dispatch(ActionCreatorDELETE(ContactById(id)));
    if (response._meta.code >= 200 && response._meta.code < 300) {
      dispatch(ActionCreator(DELETE_CONTACT, id));
      toast.success(response._meta.message);
    } else {
      toast.error(response._meta.message);
    }
  };
  render() {
    const { Contacts, MaxPageNum } = this.props;
    const { page } = this.state;
    const PageContacts = Contacts.find((item) => Number(item.pageNumber) === Number(page));
    if (!PageContacts) return LoaderIcon;
    return (
      <Fragment>
        <Table thead={TableHeaderCols} tbody={PageContacts.list} removeContact={this.removeContact} />
        <Pagination currentPage={page} maxPageNum={MaxPageNum} />
        <PageNumber currentPage={page} />
        <AddButton />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { Contacts: state.Contacts, MaxPageNum: state.PageCount };
};

export default connect(mapStateToProps)(ContactsList);
