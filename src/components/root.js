import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {init as firebaseInit} from 'javascripts/firebase'
import Routes from './routes'
import {Provider} from 'react-redux'
import configureStore from './configureStore'

export default class Root extends Component {
  constructor(props) {
    super(props)
    firebaseInit();
    this.store = configureStore();
  }
  render() {
    return (
      <Provider store={this.store}>
        <Routes history={browserHistory}/>
      </Provider>
    )
  }
}
