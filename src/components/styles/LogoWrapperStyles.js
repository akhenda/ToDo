import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'cover',
    width: 150,
    height: 150,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 45,
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    marginTop: 10,
    marginHorizontal: 15,
  },
});

export default styles;
