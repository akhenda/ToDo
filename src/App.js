import React, { Component } from 'react';
import { View, Image, StatusBar } from 'react-native';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
// import Perf from 'react-native/Libraries/Renderer/shims/ReactPerf';

import { Images } from './theme';
import reducers from './reducers';
import styles from './theme/AppWideStyles';
import RootContainer from './containers/RootContainer';


class App extends Component {
  // constructor(props) {
  //   super(props);
  // 
  //   setTimeout(() => { Perf.start(); }, 0);
  // }
  // componentDidMount() {
  //   // We have to push it to the next tick otherwise React Native would have
  //   // problems with the WorkerPerformance
  //   setTimeout(() => {
  //     Perf.start();
  // 
  //     // Some arbitrary time for metrics
  //     setTimeout(() => {
  //       // const measurements = Perf.getLastMeasurements();
  //       Perf.stop();
  //       Perf.printWasted();
  //       // Perf.printInclusive();
  //       // Perf.printOperations(measurements);
  //     }, 8000);
  //   }, 0);
  // }
  
  // componentDidMount() {
  //   setTimeout(() => {
  //     Perf.stop();
  //     // Perf.printInclusive();
  //     Perf.printWasted();
  //   }, 12000);
  // }

  render() {
    const middlewares = [thunk];

    if (process.env.NODE_ENV === 'development') {
      const { logger } = require('redux-logger');

      middlewares.push(logger);
    }

    const store = console.tron.createStore(reducers, compose(applyMiddleware(...middlewares)));

    return (
      <Provider store={store}>
        <View style={styles.mainContainer}>
          <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.6)" />
          <Image source={Images.background} style={styles.backgroundImage} />
          <RootContainer />
        </View>
      </Provider>
    );
  }
}

export default App;
