import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Components
//components
import HeaderComponent from 'components/HeaderComponent';

// import FooterComponent from 'components/FooterComponent';

export default class CheckoutScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  selectTimeSlotCallback = selectedTimeSlotId => {
    this.setState({selectedTimeSlotId});
  };

  // renderItem = ({item}) => (
  //   <TimeSlotComponent
  //     item={item}
  //     selectedTimeSlotId={this.state.selectedTimeSlotId}
  //     selectTimeSlotCallback={this.selectTimeSlotCallback}
  //   />
  // );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  selectAddressCallback = addressInfo => {
    this.setState({addressInfo});
  };

  handleAddressChange = () => {
    const navParams = {selectAddressCallback: this.selectAddressCallback};
    this.props.navigation.push('SelectAddress', navParams);
  };

  handleSelectSlotDate = (selectedSlot, selectedSlotIndex) => () => {
    this.setState({selectedSlot, selectedSlotIndex});
  };

  renderSlots = () => {
    const {slotsInfo, selectedSlotIndex} = this.state;

    return slotsInfo.map((slot, index) => {
      const {day, alias} = slot;

      let slotContainerStyle = [styles.dayTab];
      let slotDayStyle = [styles.day];
      let slotSubHeadingStyle = [styles.subHeading];
      if (selectedSlotIndex === index) {
        slotContainerStyle.push(styles.active);
        slotDayStyle.push(styles.activeText);
        slotSubHeadingStyle.push(styles.activeText);
      }

      return (
        <TouchableHighlight
          onPress={this.handleSelectSlotDate(slot, index)}
          underlayColor="#2bb25680"
          style={slotContainerStyle}
          key={index}>
          <View>
            <Text style={slotDayStyle}>{day}</Text>
            <Text style={slotSubHeadingStyle}>{alias}</Text>
          </View>
        </TouchableHighlight>
      );
    });
  };

  handlePayment = () => {
    const {push, getParam} = this.props.navigation;
    const info = getParam('info', null);

    if (info) {
      const {addressInfo, selectedSlot, selectedTimeSlotId} = this.state;
      info.addressId = addressInfo.id;
      info.deliveryDate = selectedSlot.date;
      info.slotId = selectedTimeSlotId;
      push('Payment', {info});
    }
  };

  render() {
    const {isLoading} = this.state;
    // if (isLoading) {
    //   return <CustomLoader />;
    // }

    const {status, addressInfo, selectedSlot, selectedTimeSlotId} = this.state;
    const {nickName, name, address} = addressInfo || {};
    const {slots} = selectedSlot || {};

    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          headerTitle="Checkout"
          navAction="back"
          nav={this.props.navigation}
        />

        {status ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{status}</Text>
          </View>
        ) : (
          <View style={styles.mainContainer}>
            <View style={[styles.userInfo, styles.row]}>
              <View style={styles.infoContainer}>
                <Text style={styles.heading}>{nickName}</Text>
                <Text style={styles.description}>{name}</Text>
                <Text style={styles.description}>{address}</Text>
              </View>
              <TouchableHighlight
                onPress={this.handleAddressChange}
                underlayColor="#ffffff80"
                style={styles.button}>
                <Text style={styles.buttonText}>Change</Text>
              </TouchableHighlight>
            </View>

            <Text style={styles.heading}>
              Choose delivery slot for this address
            </Text>

            <View style={styles.deliverySlotsContainer}>
              <View style={styles.deliverySlotsDayContainer}>
                {this.renderSlots()}
              </View>

              <View style={styles.slots}>
                <FlatList
                  data={slots}
                  extraData={selectedTimeSlotId}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={this.itemSeparator}
                  contentContainerStyle={styles.listContainer}
                />
              </View>
            </View>

            <TouchableHighlight
              onPress={this.handlePayment}
              underlayColor="#2bb25680"
              style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Process to Payment</Text>
            </TouchableHighlight>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  mainContainer: {
    flex: 1,
    padding: wp(2),
  },
  userInfo: {
    backgroundColor: '#fff',
    padding: wp(2),
    marginBottom: hp(2),
  },
  infoContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: wp(1),
  },
  deliverySlotsContainer: {
    flex: 1,
  },
  heading: {
    fontSize: wp(3.5),
    marginBottom: wp(2),
  },
  day: {
    fontSize: wp(3),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subHeading: {
    fontSize: wp(2.5),
    textAlign: 'center',
  },
  description: {
    fontSize: wp(3),
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    marginRight: wp(2),
  },
  buttonText: {
    fontSize: wp(3),
    color: '#333',
  },
  dayTab: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    // backgroundColor: '#f2f1f1',
    padding: wp(2),
  },
  deliverySlotsDayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  active: {
    backgroundColor: '#2bb256',
    borderBottomWidth: 1,
    borderBottomColor: '#00832a',
  },
  activeText: {
    color: '#fff',
  },
  listContainer: {
    paddingVertical: wp(2),
  },
  separator: {
    height: wp(2),
  },
  saveButton: {
    backgroundColor: '#2bb256',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: wp(3),
    color: '#fff',
  },
});
