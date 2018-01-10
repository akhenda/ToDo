import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene, Modal, Tabs } from 'react-native-router-flux';

import LoginScreen from '../containers/LoginScreen';
import SignUpScreen from '../containers/SignUpScreen';
import EditScreen from '../containers/EditScreen';
import HomeScreen from '../containers/HomeScreen';
import ActiveScreen from '../containers/ActiveScreen';
import StarredScreen from '../containers/StarredScreen';
import CompletedScreen from '../containers/CompletedScreen';

import ActivitySpinner from '../components/ActivitySpinner';
import TabIcon from '../components/TabIcon';
import { isUserSignedIn } from '../actions';

import { Colors } from '../theme';
import styles from './styles/RootContainerStyles';


class RootContainer extends Component {
  componentWillMount() {
    this.props.isUserSignedIn();
  }

  // shouldComponentUpdate(nextProps) {
  //   return (
  //     (nextProps.authenticated !== this.props.authenticated)
  //     && (nextProps.user !== this.props.user)
  //   );
  // }

  render() {
    if (this.props.user === null) return <ActivitySpinner size={60} />;

    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.2)" />
        <Router>
          <Scene key="root" navigationBarStyle={styles.header}>
            <Scene key="auth" hideNavBar initial={!this.props.authenticated}>
              <Scene key="login" title="Log In" component={LoginScreen} />
              <Scene key="signup" title="Sign Up" component={SignUpScreen} />
            </Scene>
            <Scene key="main" hideNavBar initial={this.props.authenticated}>
              <Tabs
                initial
                showIcon
                showLabel
                key="home"
                swipeEnabled
                lazy={false}
                type="reset"
                default="all"
                upperCaseLabel
                tabBarPosition="bottom"
                animationEnabled={false}
                activeBackgroundColor="rgba(255,255,255,0.04)"
                activeTintColor={Colors.text}
                inactiveTintColor={Colors.steel}
                tabBarStyle={{ backgroundColor: Colors.secondary }}
              >
                <Scene
                  initial
                  key="all"
                  hideNavBar
                  title="HOME"
                  icon={TabIcon}
                  iconName="home"
                  component={HomeScreen}
                />
                <Scene
                  hideNavBar
                  key="active"
                  title="ACTIVE"
                  icon={TabIcon}
                  component={ActiveScreen}
                  iconName="ios-pulse-outline"
                />
                <Scene
                  hideNavBar
                  title="COMPLETED"
                  icon={TabIcon}
                  key="completed"
                  iconName="ios-checkbox"
                  component={CompletedScreen}
                />
                <Scene
                  hideNavBar
                  key="starred"
                  title="STARRED"
                  icon={TabIcon}
                  component={StarredScreen}
                  iconName="ios-star"
                />
              </Tabs>
              <Scene
                key="edit"
                title="Edit ToDo"
                hideNavBar={false}
                component={EditScreen}
                titleStyle={styles.headerTitle}
                navBarButtonColor={Colors.snow}
              />
            </Scene>
          </Scene>
        </Router>
      </View>
    );
  }
}

RootContainer.propTypes = {
  user: PropTypes.object,
  authenticated: PropTypes.bool,
  isUserSignedIn: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, { isUserSignedIn })(RootContainer);
