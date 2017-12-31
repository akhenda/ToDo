import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import {
  Container, Text, View, Tabs, Tab, TabHeading, Icon, Fab, Button, Header, Body, Title, Left, Right
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import { Images, Metrics, Colors } from '../theme';
import ToDos from '../components/ToDos';
import { signOut } from '../actions';

import styles from './styles/HomeScreenStyles';

const HEADER_SCROLL_DISTANCE = Metrics.headerMaxHeight - Metrics.headerMinHeight;

class HomeScreen extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  renderTabHeading(icon, title) {
    return (
      <TabHeading style={styles.tabHeading}>
        <Icon name={icon} style={styles.tabHeadingIcon} />
        <Text style={styles.tabHeadingText}>{title}</Text>
      </TabHeading>
    );
  }

  renderTabContent(bannerSource, page) {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE - 9],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
    
    const FABTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -170],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.tabContent}>
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
        <ToDos page={page} scrollY={this.state.scrollY} />
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
      </View>
    );
  }

  render() {
    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 0.9, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0.1, 1],
      extrapolate: 'clamp',
    });

    return (
      <Container style={styles.container}>
        <Tabs
          locked
          scrollWithoutAnimation
          tabBarPosition="bottom"
          tabBarUnderlineStyle={styles.tabBarIndicator}
        >
          <Tab heading={this.renderTabHeading('home', 'HOME')}>
            {this.renderTabContent(Images.home, 'home')}
          </Tab>
          <Tab heading={this.renderTabHeading('ios-pulse-outline', 'ACTIVE')}>
            {this.renderTabContent(Images.active, 'active')}
          </Tab>
          <Tab heading={this.renderTabHeading('ios-checkbox', 'COMPLETED')}>
            {this.renderTabContent(Images.completed, 'completed')}
          </Tab>
          <Tab heading={this.renderTabHeading('ios-star', 'STARRED')}>
            {this.renderTabContent(Images.starred, 'starred')}
            <Button full danger onPress={() => this.props.signOut()}>
              <Icon name="ios-exit" />
              <Text>Sign Out</Text>
            </Button>
          </Tab>
        </Tabs>
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
            elevation: 4,
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
            ToDo
          </Text>
          <Button transparent onPress={() => Actions.edit()}>
            <Icon name="md-add" style={{ color: 'white', fontSize: 30 }} />
          </Button>
        </Animated.View>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  signOut: PropTypes.func,
};

export default connect(null, { signOut })(HomeScreen);
