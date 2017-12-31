import { StyleSheet } from 'react-native';

import { Colors, Metrics } from '../../theme';


export default StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.secondary,
    overflow: 'hidden',
    height: Metrics.headerMaxHeight,
  },
  bannerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: Metrics.headerMaxHeight,
    resizeMode: 'cover',
  },
  // tabBarIndicator: {
  //   backgroundColor: Colors.primary,
  // },
  // tabHeading: {
  //   flexDirection: 'column',
  //   backgroundColor: Colors.secondary,
  // },
  // tabHeadingIcon: {
  //   fontSize: 22,
  //   color: Colors.steel,
  // },
  // tabHeadingText: {
  //   fontSize: 11,
  //   color: Colors.snow,
  // },
  // tabContent: {
  //   flex: 1,
  // },
  fabContainer: {
    marginTop: '24%',
  },
  fabContent: {
    backgroundColor: Colors.primary,
  },
});
