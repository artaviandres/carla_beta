import React, { Component } from 'react';
import Modal from 'react-modal';
import SectionList from './section-list';
import Footer from '../footer/footer';
import Header from '../header/header';
import {connect} from 'react-redux';
import {loadSections, createSection, deleteSection, editEntry} from 'actions/todo';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '50vh',
    width                 : '50vh'
  }
};

Modal.setAppElement('#root');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      editModal: false,
      id: ''
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  deleteEntry = (id) => {
    this.props.deleteSection(id);
    window.location.reload();
  }

  toggleEditModal(state, id){
    this.setState({
      editModal: state,
      id
    });
    // this.props.editEntry(id, name, injectionPlace);
  }

  onSubmitEdit = (e) => {
    e.preventDefault();
    let ref = this.refs['injection-date-edit']
    let sectionName = ref.value
    let place = this.refs['injection-place-edit']
    let injectionPlace = place.value
    if (sectionName !== '' && injectionPlace !== '') {
      this.props.editEntry(this.state.id, sectionName, injectionPlace)
      this.cleanValues(ref, place)
      this.toggleEditModal(false)
      window.location.reload();
    }
    else {
      alert('datos vacíos');
    }
  }

  toggleModal(state) {
    this.setState({
      modal: state
    });
  }

  componentDidMount() {
    this.props.loadSections()
  }

  onSubmit = (e) => {
    e.preventDefault();
    let ref = this.refs['injection-date']
    let sectionName = ref.value
    let place = this.refs['injection-place']
    let injectionPlace = place.value
    if (sectionName !== '' && injectionPlace !== '') {
      this.props.createSection(sectionName, injectionPlace)
      this.cleanValues(ref, place)
      this.toggleModal(false)
    }
    else {
      alert('datos vacíos');
    }
  }
  
  cleanValues = (ref, place) => {
    ref.value = '';
    place.value = '';
  }

  render() {
    return (
      <div>
        <Header />
        <SectionList
          sections={this.props.sections}
          addNew={() => this.toggleModal(true)}
          delete={this.deleteEntry}
          edit={this.toggleEditModal}
        />
        <Modal
          isOpen={this.state.modal}
          onRequestClose={() => this.toggleModal(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form onSubmit={this.onSubmit}>
            <p>Agregar nueva inyección</p>
            <input ref="injection-date" type="date" id="date" />
            <br />
            <input ref="injection-place" type="number" />
            <br />
            <button>Add new injection</button>
          </form>
        </Modal>
        <Modal
          isOpen={this.state.editModal}
          onRequestClose={() => this.toggleEditModal(false)}
          style={customStyles}
          contentLabel="edit modal"
        >
          <form onSubmit={this.onSubmitEdit}>
            <p>Editar inyección</p>
            <input ref="injection-date-edit" type="date" />
            <br />
            <input ref="injection-place-edit" type="number" />
            <br />
            <button>Edit injection</button>
          </form>
        </Modal>
        <Footer />
        <style>{`
          form {
            text-align: center;
          }
          form p {
            margin-bottom: 40px;
          }
          form input {
            width: 50%;
            height: 30px;
            margin-bottom: 40px;
          }
          form button {
            background-color: #F79F81;
            color: white;
            border: none;
            width: 50%;
            height: 30px;
            cursor: pointer;
          }
          form button:focus {
            outline: 0;
          }
        `}</style>
      </div>
    );
  }
}
  const mapStateToProps = (state) => {
    return {
      sections: state.todo.sections
    }
  }
export default connect(mapStateToProps, {loadSections, createSection, deleteSection, editEntry})(App)