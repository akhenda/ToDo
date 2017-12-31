import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StatusBar } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import LogoWrapper from '../components/LogoWrapper';
import LoginRegisterForm from '../components/LoginRegisterForm';
import { emailChanged, passwordChanged, signupUser } from '../actions';

import { Images } from '../theme';
import styles from './styles/LoginScreenStyles';


class SignUpScreen extends Component {
  onChangeEmail(text) {
    this.props.emailChanged(text);
  }

  onChangePassowrd(text) {
    this.props.passwordChanged(text);
  }

  loginUser() {
    const { email, password } = this.props;

    this.props.signupUser({ email, password });
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
        <LogoWrapper pageTitle="Create an Account" error={hasError ? error.message : ''} />
        <LoginRegisterForm
          error={hasError}
          loading={loading}
          buttonText="Sign Up"
          altText="Have an Account? Log In."
          altAction={() => Actions.pop()}
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

SignUpScreen.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.object,
  emailChanged: PropTypes.func,
  passwordChanged: PropTypes.func,
  signupUser: PropTypes.func,
};

const mapStateToProps = ({ auth }) => {
  const {
    email, password, loading, error,
  } = auth;

  return {
    email,
    password,
    loading,
    error,
  };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, signupUser,
})(SignUpScreen);
