import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import Header from 'components/HeaderComponent';
//api
import {connect} from 'react-redux';
import {policiesOperations, policiesSelectors} from 'data/redux/policies';

class PrivacyPolicies extends Component {
  constructor(props) {
    super(props);
    this.state = {terms: ''};
  }

  componentDidMount() {
    this.termsCondition();
  }

  termsCondition = async () => {
    try {
      const params = null;
      await this.props.privacyPolicy(params).then(() => {
        if (this.props.isPrivacySuccess) {
          const {success, message} = this.props.isPrivacySuccess;
          if (success) {
            const {description} = this.props.isPrivacySuccess;
            this.setState({terms: description});
          } else {
            this.setState({terms: null, message});
          }
        }
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  redirectLogin = () => {
    this.props.navigation.pop();
  };
  render() {
    const {terms, message} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="रद्दीकरण/धनवापसी नीति"
          nav={this.props.navigation}
          //   showLocationPicker
          // showNotificationIcon
          // showCartIcon
        />
        {/* <Text style={styles.textstyle}> रद्दीकरण/धनवापसी नीति </Text> */}
        {terms ? (
          <WebView
            source={{html: terms}}
            scalesPageToFit={true}
            style={styles.webview}
          />
        ) : (
          <Text>{message}</Text>
        )}
        {/* <TouchableOpacity
          style={styles.agreeButton}
          onPress={this.redirectLogin}>
          <Text style={styles.agreeText}>I Agree</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isPrivacySuccess: policiesSelectors.isCancelSuccess(state),
});
const mapDispatchToProps = {
  privacyPolicy: policiesOperations.cancelRefund,
};
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicies);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textstyle: {
    textAlign: 'center',
    paddingVertical: 2,
    //marginTop: hp(3),
    fontSize: wp(5),
  },
  webview: {
    //marginTop: 10,
    //marginBottom: 10,
  },
  agreeButton: {
    backgroundColor: '#0082e7',
    height: hp(6),
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: hp(1),
  },
  agreeText: {
    color: 'white',
  },
});
