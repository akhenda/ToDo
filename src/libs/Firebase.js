import firebase from 'react-native-firebase';

const config = {
  apiKey: 'AIzaSyBxw8vXZ-okid15D4abOnFta0SFjuQEg9E',
  authDomain: 'todo-13a19.firebaseapp.com',
  databaseURL: 'https://todo-13a19.firebaseio.com',
  projectId: 'todo-13a19',
  storageBucket: 'todo-13a19.appspot.com',
  messagingSenderId: '365396063652',
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
