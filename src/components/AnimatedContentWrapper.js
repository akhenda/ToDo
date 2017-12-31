import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Platform, StatusBar } from 'react-native';
import {
  Container, Text, View, Tabs, Tab, TabHeading, Icon, Fab, Button, Header, Body, Title, Left, Right
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import { Metrics, Colors } from '../theme';

import styles from './styles/AnimatedContentWrapperStyles';

const HEADER_SCROLL_DISTANCE = Metrics.headerMaxHeight - Metrics.headerMinHeight;

class AnimatedContentWrapper extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return (
  //     (nextProps.bannerSource !== this.props.bannerSource)
  //     && (nextProps.headerTitle !== this.props.headerTitle)
  //     && (nextProps.scrollY !== this.props.scrollY)
  //   );
  // }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { scrollY, children, bannerSource, headerTitle } = this.props;

    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE - 9],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
    
    const FABTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -170],
      extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 0.9, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0.1, 1],
      extrapolate: 'clamp',
    });

    return (
      <Container style={styles.container}>
        <Animated.View style={[styles.banner, { transform: [{ translateY: headerTranslate }] }]}>
          <Animated.Image
            source={bannerSource}
            style={[
              styles.bannerImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
          />
        </Animated.View>
        {children}
        <Animated.View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.secondary,
            paddingTop: Platform.OS === 'ios' ? 28 + 6 : StatusBar.currentHeight + 6,
            paddingBottom: 3,
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            opacity: headerOpacity,
            elevation: 6,
          }}
        >
          <Button transparent>
            <Icon name="ios-menu" style={{ color: 'white', fontSize: 30 }} />
          </Button>
          <Text
            style={{
              fontSize: 20,
              color: '#FFFFFF',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {headerTitle}
          </Text>
          <Button transparent onPress={() => Actions.edit()}>
            <Icon name="md-add" style={{ color: 'white', fontSize: 30 }} />
          </Button>
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 78,
            height: 78,
            marginTop: Metrics.headerMaxHeight - 48,
            opacity: imageOpacity,
            transform: [{ translateY: FABTranslate }],
          }}
        >
          <Fab
            style={styles.fabContent}
            position="topRight"
            onPress={() => Actions.edit()}
          >
            <Icon name="md-add" />
          </Fab>
        </Animated.View>
      </Container>
    );
  }
}

AnimatedContentWrapper.propTypes = {
  scrollY: PropTypes.object.isRequired,
  headerTitle: PropTypes.string.isRequired,
  bannerSource: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AnimatedContentWrapper;
