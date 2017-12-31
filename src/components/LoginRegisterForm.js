import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { View, Text, Item, Input, Icon, Button } from 'native-base';

import styles from './styles/LoginRegisterFormStyles';


class LoginRegisterForm extends Component {
  render() {
    const {
      altText,
      loading,
      buttonText,
      onChangeEmail,
      onChangePassword,
      onSubmitForm,
      emailValue,
      passwordValue,
      error,
      altAction,
    } = this.props;

    return (
      <View style={styles.loginForm}>
        <Item rounded style={styles.textInput} error={error}>
          <Icon active name="ios-mail" style={styles.textInputIcon} />
          <Input
            placeholder="Email"
            style={styles.textInputField}
            value={emailValue}
            onChangeText={onChangeEmail}
            keyboardType="email-address"
          />
        </Item>
        <Item rounded style={styles.textInput} error={error}>
          <Icon active name="ios-lock" style={styles.textInputIcon} />
          <Input
            secureTextEntry
            placeholder="Password"
            style={styles.textInputField}
            value={passwordValue}
            onChangeText={onChangePassword}
          />
        </Item>
        <Button rounded block light style={styles.button} onPress={onSubmitForm}>
          {loading
            ? <ActivityIndicator animating size="large" />
            : <Text>{buttonText}</Text>
          }
        </Button>
        <Button transparent block light style={styles.button} onPress={altAction}>
          <Text>{altText}</Text>
        </Button>
      </View>
    );
  }
}

LoginRegisterForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  altText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  emailValue: PropTypes.string,
  passwordValue: PropTypes.string,
  error: PropTypes.bool.isRequired,
  altAction: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export default LoginRegisterForm;
