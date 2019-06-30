import React, { PureComponent, Fragment } from 'react';
import Img from 'react-image';
// redux modules
import { connect } from 'react-redux';
import { ActionCreatorGET } from '../store/ActionCreators/actionCreatorGET';
import { ActionCreatorDELETE } from '../store/ActionCreators/actionCreatorDELETE';
import { ActionCreator } from '../store/ActionCreators/actionCreator';
import { FindContactsByPage, ContactById } from '../store/endPoints';
import { DELETE_CONTACT, ADD_CONTACT_GROUP } from '../store/actionTypes';
//  components
import Pagination from '../components/pagination';
import PageNumber from '../components/pageNumber';
import AddButton from '../components/addButton';
import Table from '../components/table';
// assets
import { toast } from 'react-toastify';
import Loader from '../assets/images/loader.svg';

const TableHeaderCols = ['Avatar', 'First name', 'Last name', 'Phone', 'Email', 'Website', 'Actions'];

class ContactsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { page: props.match.params.id };
  }
  componentDidMount() {
    this.getContacts();
    console.log('mount');
  }
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.match.params.id !== prevState.page) {
      // document.getElementById('tb').classList.add('fadeIn');
      return { page: nextProps.match.params.id };
    } else {
      console.log('same page');
      return null;
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const { Contacts } = this.props;
    if (this.props.match.params.id !== prevState.page && !Contacts.find((item) => Number(item.pageNumber) === Number(this.props.match.params.id))) {
      this.getContacts();
    }
    // setTimeout(() => {
    //   document.getElementById('tb').scrollTop = 0;
    //   document.getElementById('tb').classList.remove('fadeIn');
    // }, 500);

    console.log('update');
  }
  onPageChange = (page) => {
    this.setState({ page });
  };
  getContacts = async () => {
    const { dispatch } = this.props;
    const { page } = this.state;
    const response = dispatch(ActionCreatorGET(FindContactsByPage(page), ADD_CONTACT_GROUP));
    response.then((data) => dispatch(ActionCreator('SET_PAGE_COUNT', data.payload._meta.pageCount)));
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
    if (!PageContacts) {
      return <Img src={Loader} />;
    }
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
