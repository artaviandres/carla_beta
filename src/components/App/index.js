import React, { Component } from 'react';
import Modal from 'react-modal';
import SectionList from './section-list';
import Footer from '../footer/footer';
import Header from '../header/header';
import {connect} from 'react-redux';
import {loadSections, createSection} from 'actions/todo';

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
      modal: false
    }
    this.toggleModal = this.toggleModal.bind(this);
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
        <SectionList sections={this.props.sections} addNew={() => this.toggleModal(true)} />
        <Modal
          isOpen={this.state.modal}
          onRequestClose={() => this.toggleModal(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form onSubmit={this.onSubmit}>
            <p>Agregar nueva inyección</p>
            <input ref="injection-date" type="date" />
            <br />
            <input ref="injection-place" type="number" />
            <br />
            <button>Add new injection</button>
          </form>
        </Modal>
        <Footer />
      </div>
    );
  }
}
  const mapStateToProps = (state) => {
    return {
      sections: state.todo.sections
    }
  }
export default connect(mapStateToProps, {loadSections, createSection})(App)