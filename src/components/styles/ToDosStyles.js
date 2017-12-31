import { StyleSheet } from 'react-native';

import { Metrics } from '../../theme';

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignSelf: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
    marginVertical: 15,
  },
  itemList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  itemListText: {
    width: '65%',
  },
  spacer: {
    height: 30,
  },
  content: {
    marginTop: Metrics.headerMaxHeight,
  },
  emptySection: {
    flex: 1,
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
});

export default styles;
