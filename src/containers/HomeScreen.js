import React, { Component } from 'react';
import { Animated } from 'react-native';

import { Images } from '../theme';
import ToDos from '../components/ToDos';
import AnimatedContentWrapper from '../components/AnimatedContentWrapper';


class HomeScreen extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    return (
      <AnimatedContentWrapper
        scrollY={this.state.scrollY}
        bannerSource={Images.home}
        headerTitle="All ToDos"
      >
        <ToDos page="home" scrollY={this.state.scrollY} />
      </AnimatedContentWrapper>
    );
  }
}

export default HomeScreen;
