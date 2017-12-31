import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { View, Text } from 'native-base';

import { Images } from '../theme';
import styles from './styles/LogoWrapperStyles';


class LogoWrapper extends Component {
  renderError() {
    const { error } = this.props;
    return error
      ? <Text style={styles.errorText}>{error}</Text>
      : null;
  }

  render() {
    const { pageTitle } = this.props;
    return (
      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.logo} />
        <Text style={styles.logoText}>ToDo</Text>
        <Text style={styles.pageTitle}>{pageTitle}</Text>
        {this.renderError()}
      </View>
    );
  }
}

LogoWrapper.propTypes = {
  error: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default LogoWrapper;
