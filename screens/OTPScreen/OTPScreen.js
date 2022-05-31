import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import SafeAreaView from 'react-native-safe-area-view';
import get from 'loadsh/get';
// component
import ProcessingLoader from 'components/ProcessingLoader';
import showToast from 'components/CustomToast';
// Images
import appLogo from 'assets/images/logo.png';
// Redux
import {connect} from 'react-redux';
import {authOperations, authSelectors} from 'data/redux/auth';
import {KEYS, storeData} from 'api/UserPreference';
import {AppContext} from 'context_api/context';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ONLINE_STATUS,
  COMPLETE_PROFILE_STATUS,
  USER_DATA,
  accessToken,
  TOKEN,
  USER_ROLE,
} from 'context_api/constant';
function OTPScreen(props) {
  const mobile = get(props.route, 'params.mobile');
  const [otp, setOtp] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const {signIn} = useContext(AppContext);

  useEffect(() => {
    const {success, message} = props.isOtpVerifySuccess;
    if (success) {
      const {userInfo} = props.isOtpVerifySuccess;
      storeData(KEYS.USER_INFO, userInfo);

      AsyncStorage.setItem(COMPLETE_PROFILE_STATUS, 'true');
      AsyncStorage.setItem(accessToken, userInfo.authToken);
      AsyncStorage.setItem(ONLINE_STATUS, 'true');
      AsyncStorage.setItem(USER_DATA, userInfo);
      AsyncStorage.setItem(TOKEN, 'true');
      if (success) {
        signIn();
      }

      setIsProcessing(false);
      showToast(message);
    } else {
      showToast(message);
      setIsProcessing(false);
    }
  }, [props]);

  const handleLogin = otp => {
    setOtp(otp);
  };
  const handleAddress = async () => {
    setIsProcessing(true);
    const params = {
      mobile,
      otp,
    };
    await props.otpVerify(params);
  };

  const handleResendOtp = async () => {
    const params = {mobile};
    await props.resendOtp(params).then(() => {
      const {success} = props.isOtpResendSuccess;
      if (success) {
        const {message} = props.isOtpResendSuccess;
        showToast(message);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <View style={styles.loginContainer}>
          <Image source={appLogo} resizeMode="cover" style={styles.logo} />

          <OTPInputView
            style={styles.otpContainer}
            pinCount={4}
            autoFocusOnLoad
            placeholderCharacter="0"
            placeholderTextColor="#ACACAC"
            keyboardType="number-pad"
            codeInputFieldStyle={styles.underlineStyleBase}
            onCodeFilled={handleLogin}
          />

          <TouchableHighlight
            style={styles.appButton}
            onPress={handleAddress}
            underlayColor="#ffffff80">
            <Text style={styles.otpText}>ओटीपी डाले</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.appButton}
            onPress={handleResendOtp}
            underlayColor="#ffffff80">
            <Text style={styles.otpText}>ओटीपी पुनः भेजें</Text>
          </TouchableHighlight>
        </View>
      </View>
      {isProcessing && <ProcessingLoader />}
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({
  isOtpVerifySuccess: authSelectors.isOtpVerifySuccess(state),
  isOtpResendSuccess: authSelectors.isOtpResendSuccess(state),
});
const mapDispatchToProps = {
  otpVerify: authOperations.otpVerify,
  resendOtp: authOperations.resendOtp,
};
export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    backgroundColor: '#fff',
  },
  backgroundImageContainer: {
    flex: 1,
  },
  bgContainer: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: wp(25),
    marginBottom: hp(3),
    aspectRatio: 1 / 1,
  },
  otpContainer: {
    width: wp(50),
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  underlineStyleBase: {
    color: '#333',
    backgroundColor: '#fff',
    width: 36,
    height: 36,
  },
  resendOTPButton: {
    marginTop: hp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendOTPButtonText: {
    color: '#fff',
    fontSize: wp(3.8),
  },
  errorMessageText: {
    color: 'red',
    fontSize: wp(3.6),
    marginBottom: hp(1.5),
  },
  appButton: {
    backgroundColor: '#0b8457',
    height: hp(5.5),
    width: wp(25),
    borderRadius: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(4),
  },
  otpText: {
    fontSize: wp(3.5),
    color: '#fff',
  },
});
