import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Icon } from 'native-base';

import styles from './styles/TabIconStyles';


class TabIcon extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      (nextProps.focused !== this.props.focused)
      && (nextProps.iconName !== this.props.iconName)
    );
  }

  render() {
    const { focused, iconName } = this.props;
    const color = focused ? styles.activeIcon : styles.inActiveIcon;

    return (
      <View style={styles.tabIconWrapper}>
        <Icon style={color} name={iconName || 'ios-home'} size={18} />
      </View>
    );
  }
}

TabIcon.propTypes = {
  focused: PropTypes.bool,
  iconName: PropTypes.string,
};

export default TabIcon;
