import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Components
// import HeaderComponent from 'components/HeaderComponent';

// Icons
import ic_wallet from 'assets/icons/ic_wallet.png';

//api
import {connect} from 'react-redux';
import {walletOperations, walletSelectors} from 'data/redux/wallet';
import logo from 'assets/images/logo.png';
import get from 'loadsh/get';
//payment gateway
import RazorpayCheckout from 'react-native-razorpay';
class RechargeWalletScreen extends Component {
  constructor(props) {
    super(props);
    const miniAmount = get(props.route, 'params.miniAmount');
    this.state = {
      walletBalance: 0,
      minimum: miniAmount,
      amount: 0,
    };
  }

  handleAdd_Money = async () => {
    try {
      var {amount, minimum, code} = this.state;

      if (!amount) {
        alert('Please choose a pack to add amount', [{text: 'OK'}]);
        return;
      }

      if (!(amount >= minimum)) {
        alert(`Please Add Minimum ${minimum} Rupees`, [{text: 'OK'}]);
        return;
      }
      if (!(amount <= 10000)) {
        alert('Please Add Money Below 10000', [{text: 'OK'}]);
        return;
      }
      // const userInfo = await getData(KEYS.USER_INFO);
      this.setState({isProcessing: true});
      if (code) {
        const params = {
          couponCode: code,
          amount,
        };
        await this.props.addMoney(params);

        const {success, message} = this.props.isMoneyAdded;
        if (success != undefined && success != false) {
          this.setState({isProcessing: false});
          const {output} = this.props.isMoneyAdded;
          const {
            orderId,
            onlineOrderId,
            onlineKeyId,
            orderAmount,
            currency,
            description,
            merchantLogo,
            merchantName,
          } = output;
          const info = {
            orderId,
            onlineOrderId,
            onlineKeyId,
            orderAmount,
            currency,
            description,
            merchantLogo,
            merchantName,
          };
          await this.handleOnlinePayment(info);
          // showToast(message);
          this.setState({amount: null});
        } else {
          this.setState({isProcessing: false});
        }
      } else {
        const params = {
          couponCode: '',
          amount,
        };
        await this.props.addMoney(params);
        const {success, message} = this.props.isMoneyAdded;
        if (success != undefined && success != false) {
          this.setState({isProcessing: false});
          const {output} = this.props.isMoneyAdded;
          const {
            orderId,
            onlineOrderId,
            onlineKeyId,
            orderAmount,
            currency,
            description,
            merchantLogo,
            merchantName,
          } = output;
          const info = {
            orderId,
            onlineOrderId,
            onlineKeyId,
            orderAmount,
            currency,
            description,
            merchantLogo,
            merchantName,
          };
          await this.handleOnlinePayment(info);
          // showToast(message);
          this.setState({amount: 0});
        } else {
          this.setState({isProcessing: false});
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleOnlinePayment = async info => {
    try {
      const {
        userId,
        orderId,
        onlineOrderId,
        onlineKeyId,
        orderAmount,
        currency,
        description,
        merchantLogo,
        merchantName,
      } = info;
      const options = {
        key: onlineKeyId,
        // key: 'rzp_test_nBxiE2ZSodCXCO',
        //amount: `${amount}`,
        amount: orderAmount,
        currency: currency,
        name: 'Gaouri brand',
        order_id: onlineOrderId,
        description: 'Gaouri brand',
        image: logo,
        theme: {color: '#0b8457'},
      };
      // console.log(options);
      // transferring control to payment gateway
      const paymentGatewayResponse = await RazorpayCheckout.open(options);

      // processing payment gateway response
      if (paymentGatewayResponse) {
        const {
          razorpay_order_id: onlineOrderId,
          razorpay_payment_id: onlinePaymentId = null,
          razorpay_signature: onlineSignature = null,
        } = paymentGatewayResponse;

        // preparing params
        const params = {
          orderId,
          onlineOrderId,
          onlinePaymentId,
          onlineSignature,
        };
        // calling api
        await this.props.paymentVerify(params);
        // processing response
        if (this.props.isPaymentVerifySuccess) {
          // updating cart item count
          //const {cartCount: cartItemCount} = response;
          //await storeData(KEYS.CART_ITEM_COUNT, {cartItemCount});
          // stopping loader

          this.setState({isProcessing: false});

          // navigating
          this.props.navigation.navigate('Wallet');
        }
      }
    } catch (error) {
      const {code, description} = error;

      if (code === 0 && description === 'Payment Cancelled') {
        // stopping loader
        this.setState({isProcessing: false});
      } else if (code === 2 && description === 'Payment cancelled by user') {
        // stopping loader
        this.setState({isProcessing: false});
      } else {
        console.log(error);
      }
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.walletAmountContainer}>
            <Image
              source={ic_wallet}
              resizeMode="cover"
              style={styles.walletIcon}
            />
            <Text style={styles.walletTitle}>वॉलेट राशि</Text>
            <Text style={styles.walletAmount}>₹ {this.state.amount}</Text>
          </View>

          <View style={styles.addWallet}>
            <Text style={styles.rechargeTitle}>रिचार्ज वॉलेट</Text>
            <Text style={styles.rechargeSubTitle}>
              उपलब्ध कॉलिंग पैक में से चुनें।
            </Text>

            <View style={styles.packageContainer}>
              <Text
                style={styles.packageTile}
                onPress={() => this.setState({amount: '10'})}>
                ₹ 10.00
              </Text>
              <Text
                style={styles.packageTile}
                onPress={() => this.setState({amount: '20'})}>
                ₹ 20.00
              </Text>
              <Text
                style={styles.packageTile}
                onPress={() => this.setState({amount: '50'})}>
                ₹ 50.00
              </Text>
              <Text
                style={styles.packageTile}
                onPress={() => this.setState({amount: '100'})}>
                ₹ 100.00
              </Text>
              <Text
                style={styles.packageTile}
                onPress={() => this.setState({amount: '200'})}>
                ₹ 200.00
              </Text>
              <Text
                style={styles.packageTile}
                onPress={() => this.setState({amount: '500'})}>
                ₹ 500.00
              </Text>
              <Text
                style={styles.packageTile}
                onPress={() => this.setState({amount: '1000'})}>
                ₹ 1000.00
              </Text>
              <Text
                style={styles.packageTile}
                onPress={() => this.setState({amount: '2000'})}>
                ₹ 2000.00
              </Text>
              <Text
                style={styles.packageTile}
                onPress={() => this.setState({amount: '5000'})}>
                ₹ 5000.00
              </Text>
            </View>
          </View>
        </View>

        <TouchableHighlight
          style={styles.rechargeButton}
          onPress={this.handleAdd_Money}
          underlayColor="#0b845780">
          <Text style={styles.rechargeButtonText}>जोड़े</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isShowWalletBalance: walletSelectors.isShowWalletBalance(state),
  isWalletIncome: walletSelectors.isWalletIncome(state),
  isMoneyAdded: walletSelectors.isMoneyAdded(state),
  isPaymentVerifySuccess: walletSelectors.isPaymentVerifySuccess(state),
});
const mapDispatchToProps = {
  walletBalance: walletOperations.walletBalance,
  walletIncome: walletOperations.walletIncome,
  addMoney: walletOperations.addMoney,
  paymentVerify: walletOperations.paymentVerify,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RechargeWalletScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: wp(3),
  },
  walletAmountContainer: {
    backgroundColor: '#cccccc80',
    width: wp(94),
    height: hp(25),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: wp(3),
  },
  walletIcon: {
    height: hp(10),
    aspectRatio: 1 / 1,
  },
  walletTitle: {
    fontSize: wp(4),
    color: '#333',
  },
  walletAmount: {
    fontSize: wp(5),
    color: '#333',
    fontWeight: '700',
  },
  addWallet: {
    flex: 1,
    paddingVertical: wp(2),
    alignItems: 'flex-start',
  },
  rechargeTitle: {
    fontSize: wp(5),
  },
  rechargeSubTitle: {
    fontSize: wp(3.5),
  },
  packageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: wp(3),
  },
  packageTile: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: wp(3),
    width: wp(21.225),
    paddingVertical: hp(2),
    textAlign: 'center',
    marginBottom: wp(3),
  },
  rechargeButton: {
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b8457',
    margin: wp(3),
    borderRadius: hp(3),
  },
  rechargeButtonText: {
    fontSize: wp(3.5),
    color: '#fff',
  },
});
