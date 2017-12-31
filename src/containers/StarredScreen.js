import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { connect } from 'react-redux';

import { signOut } from '../actions';
import { Images } from '../theme';
import ToDos from '../components/ToDos';
import AnimatedContentWrapper from '../components/AnimatedContentWrapper';


class StarredScreen extends Component {  
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
        bannerSource={Images.starred}
        headerTitle="Starred ToDos"
      >
        <ToDos page="starred" scrollY={this.state.scrollY} />
        <Button full danger onPress={() => this.props.signOut()}>
          <Icon name="ios-exit" />
          <Text>Sign Out</Text>
        </Button>
      </AnimatedContentWrapper>
    );
  }
}

StarredScreen.propTypes = {
  signOut: PropTypes.func,
};

export default connect(null, { signOut })(StarredScreen);
