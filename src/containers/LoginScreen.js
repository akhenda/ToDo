import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StatusBar, BackHandler } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Images } from '../theme';
import LogoWrapper from '../components/LogoWrapper';
import LoginRegisterForm from '../components/LoginRegisterForm';

import styles from './styles/LoginScreenStyles';


class LoginScreen extends Component {  
  componentWillMount() {
    if (this.props.authenticated) Actions.main({ type: 'reset' });

    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  }
  
  componentWillUnmount() {
    this.ismounted = false;
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid());
  }

  onChangeEmail(text) {
    this.props.emailChanged(text);
  }

  onChangePassowrd(text) {
    this.props.passwordChanged(text);
  }
  
  backAndroid() {
    BackHandler.exitApp();
    return false;
  }

  loginUser() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  render() {
    const {
      email, password, loading, error,
    } = this.props;
    const hasError = Object.prototype.hasOwnProperty.call(error, 'message');

    return (
      <Container style={styles.container}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0.1)" />
        <Image source={Images.background2} style={styles.backgroundImage} />
        <LogoWrapper pageTitle="Log In" error={hasError ? error.message : ''} />
        <LoginRegisterForm
          error={hasError}
          loading={loading}
          buttonText="Log In"
          altText="Don&apos;t have an Account? Create One."
          altAction={() => Actions.signup()}
          emailValue={email}
          passwordValue={password}
          onChangeEmail={text => this.onChangeEmail(text)}
          onChangePassword={text => this.onChangePassowrd(text)}
          onSubmitForm={() => this.loginUser()}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const {
    email, password, loading, error, authenticated, user,
  } = auth;

  return {
    email,
    password,
    loading,
    error,
    user,
    authenticated,
  };
};

LoginScreen.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.object,
  emailChanged: PropTypes.func,
  passwordChanged: PropTypes.func,
  loginUser: PropTypes.func,
  authenticated: PropTypes.bool,
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser,
})(LoginScreen);
