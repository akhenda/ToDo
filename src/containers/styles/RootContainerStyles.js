import { StyleSheet } from 'react-native';

import { Colors } from '../../theme';

export default StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.secondary,
  },
  headerTitle: {
    color: Colors.snow,
  },
});
