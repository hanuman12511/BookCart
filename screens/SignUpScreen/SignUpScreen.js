import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
// component
import ProcessingLoader from 'components/ProcessingLoader';
import showToast from 'components/CustomToast';
// styles
import {styles} from './styles';

// Images
import appLogo from 'assets/images/logo.png';
// Redux
import {connect} from 'react-redux';
import {authOperations, authSelectors} from 'data/redux/auth';
// validation
import {isNameValid, isMobileNumber} from 'utils/validations';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      name: '',
      place: '',
      VName: '',
      mobile: '',
      catleCount: '',
      mQty: '',
      refCode: '',
    };
  }

  onChangeName = name => {
    this.setState({name: name});
  };
  onChangePlace = place => {
    this.setState({place: place});
  };
  onChangeVName = VName => {
    this.setState({VName: VName});
  };
  onChangeMobile = mobile => {
    this.setState({mobile: mobile});
  };
  onChangeCCount = catleCount => {
    this.setState({catleCount: catleCount});
  };
  onChangeMQty = mQty => {
    this.setState({mQty: mQty});
  };
  onReferralCode = refCode => {
    this.setState({refCode: refCode});
  };

  handleHome = async () => {
    const {name, place, VName, mobile, catleCount, mQty, refCode} = this.state;

    if (!isNameValid(name)) {
      Alert.alert('', 'कृपया अपना नाम दर्ज करें !', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    if (place.trim() === '') {
      Alert.alert('', 'कृपया अपना वास्तविक स्थान दर्ज करें !', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    if (VName.trim() === '') {
      Alert.alert('', 'कृपया अपने गांव का नाम दर्ज करें !', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    if (!isMobileNumber(mobile)) {
      Alert.alert(
        '',
        'कृपया अपना वैध मोबाइल नंबर दर्ज करें !',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (catleCount.trim() === '' || catleCount === '0') {
      Alert.alert('', 'कृपया अपना वैध पशुधन संख्या भरें', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    if (mQty.trim() === '' || mQty === '0') {
      Alert.alert(
        '',
        'कृपया अपने मवेशी के दूध की मात्रा लीटर में दर्ज करें',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
      return;
    }
    this.setState({isProcessing: true});
    const params = {
      name,
      address: place,
      villageName: VName,
      mobile,
      animalCount: catleCount,
      milkQuantity: mQty,
      referralCode: refCode,
    };
    await this.props.registerUser(params).then(() => {
      const {success, message} = this.props.isRegisterSuccess;
      if (success) {
        this.setState({isProcessing: false});
        showToast(message);
        this.props.navigation.navigate('Login');
      } else {
        showToast(message);
        this.setState({isProcessing: false});
        console.log('error while registration');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <Image source={appLogo} resizeMode="cover" style={styles.Logo} />

          <Text style={styles.title}>रजिस्ट्रेशन फॉर्म</Text>

          <TextInput
            placeholder="नाम"
            placeholderTextColor="#666"
            value={this.state.name}
            onChangeText={this.onChangeName}
            style={styles.input}
          />

          <TextInput
            placeholder="जगह"
            placeholderTextColor="#666"
            value={this.state.place}
            onChangeText={this.onChangePlace}
            style={styles.input}
          />
          <TextInput
            placeholder="गांव का नाम"
            placeholderTextColor="#666"
            value={this.state.VName}
            onChangeText={this.onChangeVName}
            style={styles.input}
          />
          <TextInput
            placeholder="मोबाइल नंबर"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
            maxLength={10}
            value={this.state.mobile}
            onChangeText={this.onChangeMobile}
            style={styles.input}
          />
          <TextInput
            placeholder="पशुओ की संख्या"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
            maxLength={4}
            value={this.state.catleCount}
            onChangeText={this.onChangeCCount}
            style={styles.input}
          />
          <TextInput
            placeholder="रोज का दूध का उत्पाद"
            keyboardType="phone-pad"
            value={this.state.mQty}
            maxLength={4}
            onChangeText={this.onChangeMQty}
            placeholderTextColor="#666"
            style={styles.input}
          />
          <TextInput
            placeholder="रेफरल कोड यदि आपके पास है"
            keyboardType="phone-pad"
            value={this.state.refCode}
            maxLength={6}
            onChangeText={this.onReferralCode}
            placeholderTextColor="#666"
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={this.handleHome}>
            <Text style={styles.buttonText}>रजिस्टर करे</Text>
          </TouchableOpacity>
        </ScrollView>
        {this.state.isProcessing && <ProcessingLoader />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isRegisterSuccess: authSelectors.isRegisterSuccess(state),
});
const mapDispatchToProps = {
  registerUser: authOperations.registerUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
