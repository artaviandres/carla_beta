import * as firebase from 'firebase'
import sectionModel from './models/section'
import todoModel from './models/todo'
import section from './models/section';
let database;

export const init = () => {
    let config = {
        apiKey: "AIzaSyBd0bAHhH0fYh6-fEtrBnDeJSjImamh_ho",
        authDomain: "carla-608eb.firebaseapp.com",
        databaseURL: "https://carla-608eb.firebaseio.com",
        projectId: "carla-608eb",
        storageBucket: "carla-608eb.appspot.com",
        messagingSenderId: "373900873578"
    };
    firebase.initializeApp(config);
    database = firebase.database()
}

// return promise object
export const getSectionsDB = () => {
    return database.ref('/').once('value')
  }
  // get specified section
  export const getTodoDB = (sectionId) => {
    return database.ref(`/${sectionId}`).once('value')
  }
  // add new section
  export const addSection = (name, injectionPlace) => {
    let key = database.ref('/').push().key
    let model = sectionModel(key, name, injectionPlace,  firebase.database.ServerValue.TIMESTAMP)
    return database.ref('/'+ key).set(model)
  }
  export const editSection = (id, name, injectionPlace) => {
      let model = sectionModel(id, name, injectionPlace, firebase.database.ServerValue.TIMESTAMP)
      return database.ref(`/${id}`).update(model)
  }
  // add new todo item into specified section
  export const addTodoItem = (id, name) => {
    return new Promise((resolve, reject) => {
      database.ref(`/${id}`).once('value').then((todo) => {
        let todos = todo.val().todos || []
        let key = database.ref(`/${id}`).push().key
        todos.push(todoModel(key, name, firebase.database.ServerValue.TIMESTAMP))
        database.ref(`/${id}/todos`).set(todos)
          .then( res => {resolve(res)})
          .catch( error => {reject(error)})
      })
    })
  }
  //delete item
  export const deleteItem = (id) => {
      database.ref(`/${id}`).remove();
  }