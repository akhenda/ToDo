import React, { Component } from 'react';
import { Animated } from 'react-native';

import { Images } from '../theme';
import ToDos from '../components/ToDos';
import AnimatedContentWrapper from '../components/AnimatedContentWrapper';


class CompletedScreen extends Component {  
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
        bannerSource={Images.completed}
        headerTitle="Completed ToDos"
      >
        <ToDos page="completed" scrollY={this.state.scrollY} />
      </AnimatedContentWrapper>
    );
  }
}

export default CompletedScreen;
