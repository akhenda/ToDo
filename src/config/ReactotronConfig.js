import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron
  .configure({
    name: 'ToDo Demo',
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect(); // let's connect!

// Let's clear Reactotron every time we load the app
Reactotron.clear();

// Totally hacky, but this allows us not to be importing reactotron-react-native
// on every file.  This is just DEV mode, so no big deal.
console.tron = Reactotron;
