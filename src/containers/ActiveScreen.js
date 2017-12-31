import React, { Component } from 'react';
import { Animated } from 'react-native';

import { Images } from '../theme';
import ToDos from '../components/ToDos';
import AnimatedContentWrapper from '../components/AnimatedContentWrapper';


class ActiveScreen extends Component {  
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
        bannerSource={Images.active}
        headerTitle="Active ToDos"
      >
        <ToDos page="active" scrollY={this.state.scrollY} />
      </AnimatedContentWrapper>
    );
  }
}

export default ActiveScreen;
