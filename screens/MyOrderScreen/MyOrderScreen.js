import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
// import ic_check from 'assets/icons/ic_check.png';
// import ic_close from 'assets/icons/ic_close.png';
// Components
import Header from 'components/HeaderComponent';
import OrderListComponent from 'components/OrderListComponent';
import ProcessingLoader from 'components/ProcessingLoader';
//redux
import {connect} from 'react-redux';
import {cartOperations, cartSelectors} from 'data/redux/cart';
import get from 'loadsh/get';
class AllCategory extends Component {
  constructor(props) {
    super(props);
    this.navi = get(this.props, 'navigation.addListener');
    this.state = {
      isProcessing: true,
      message: '',
      orderList: '',
    };
  }

  componentDidMount() {
    this._subscribe = this.navi('focus', async () => {
      this.handleOrderData();
    });
  }

  // // 'didFocus'
  // UNSAFE_componentWillMount = async () => {

  // };

  componentWillUnmount() {
    this._subscribe();
  }

  handleOrderData = async () => {
    try {
      const params = null;
      await this.props.orderDetail(params).then(async () => {
        const {success, message} = this.props.isOrderDetail;
        if (success) {
          const {Orders} = this.props.isOrderDetail;
          this.setState({orderList: Orders, isProcessing: false});
        } else {
          this.setState({orderList: '', message, isProcessing: false});
        }
      });
    } catch (error) {}
  };

  renderItem = ({item}) => (
    <OrderListComponent
      item={item}
      nav={this.props.navigation}
      refreshCallback={this.fetchMyOrders}
    />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleCheckout = () => {
    this.props.navigation.push('AddAddress');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="माई आर्डर"
          nav={this.props.navigation}
          //   showLocationPicker
          showNotificationIcon
          // showCartIcon
        />
        {this.state.orderList !== '' ? (
          <View style={styles.cartListContainer}>
            <FlatList
              data={this.state.orderList}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.itemSeparator}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        ) : (
          <View style={styles.errorMsg}>
            <Text style={styles.errorTxt}>{this.state.message}</Text>
          </View>
        )}
        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isOrderDetail: cartSelectors.isOrderDetail(state),
});
const mapDispatchToProps = {
  orderDetail: cartOperations.orderDetail,
  cartUpdate: cartOperations.cartUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCategory);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  cartTopDetail: {
    margin: wp(2),
    backgroundColor: '#fff',
    padding: wp(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: wp(1),
  },
  rowSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: wp(1),
  },
  rowColumn: {
    fontSize: wp(3.5),
  },
  rowColumnBold: {
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  cartListContainer: {
    flex: 1,
  },
  separator: {
    height: wp(2),
  },
  listContainer: {
    padding: wp(2),
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: '#000',
    fontSize: wp(3.5),
    textAlign: 'center',
  },
  checkoutButton: {
    padding: wp(2),
  },
  checkoutButtonView: {
    backgroundColor: '#2bb256',
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  checkoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: wp(3.5),
    color: '#fff',
  },
  next: {
    width: wp(3.5),
    aspectRatio: 1 / 1,
    marginLeft: wp(2),
  },
  errorMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
