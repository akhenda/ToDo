import { StyleSheet } from 'react-native';

import { Colors } from '../../theme';

export default StyleSheet.create({
  tabIconWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  tabIconText: {
    fontSize: 12,
  },
  activeIcon: {
    color: Colors.text,
  },
  inActiveIcon: {
    color: Colors.steel,
  },
});
