import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: wp(6),
  },
  Logo: {
    height: hp(15),
    aspectRatio: 1 / 1,
    marginBottom: hp(3),
    alignSelf: 'center',
    marginTop: hp(12),
  },
  input: {
    fontFamily: 'OpenSans-Regular',
    flex: 1,
    backgroundColor: '#ccc8',
    height: hp(5.5),
    paddingHorizontal: wp(3),
    borderRadius: 5,
    marginBottom: wp(2),
  },
  button: {
    backgroundColor: '#0b8457',
    height: hp(5.5),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    borderRadius: 10,
    marginTop: wp(4),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(5),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp(3),
  },
});
