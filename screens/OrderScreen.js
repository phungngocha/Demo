// OrderConfirmationScreen.js
import React,{ useState} from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft,faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import InvoiceScreen from './InvoiceScreen';

function OrderScreen({ route }) {
  const navigation = useNavigation();
  const { total, cart } = route.params;
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');


  const handleOrderConfirmation = () => {
    if (!customerName || !phoneNumber || !shippingAddress) {
      // Hiển thị thông báo yêu cầu nhập đầy đủ thông tin khách hàng
      alert('Vui lòng nhập đầy đủ thông tin khách hàng!');
    } else {
      console.log('Đơn hàng đã được xác nhận!');
      navigation.navigate('Invoice', {
        customerName,
        phoneNumber,
        shippingAddress,
        total,
        cart,
        paymentMethod,
        paymentStatus: 'Đã thanh toán', // Thêm trạng thái thanh toán
      });
    }
  };

  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method);
  };

  
  
  const handleGoBack = () => {
    // Quay lại trang trước đó
    navigation.goBack();
  };
 

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={17} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Xác nhận đơn hàng</Text>
      </View>

      <View style={styles.customerInfoContainer}>
        <Text style={styles.customerInfoHeader}>* Thông tin khách hàng:</Text>
        <Text style={styles.customerInfoLabel}>Họ và Tên:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập họ và tên"
          value={customerName}
          onChangeText={(text) => setCustomerName(text)}
        />

        <Text style={styles.customerInfoLabel}>Số Điện Thoại:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập số điện thoại"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <Text style={styles.customerInfoLabel}>Địa Chỉ Giao Hàng:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập địa chỉ giao hàng"
          value={shippingAddress}
          onChangeText={(text) => setShippingAddress(text)}
        />
      </View>

      <Text style={styles.totalText}>Tổng tiền: {total}</Text>

      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>Tên sách: {item.title}</Text>
            <Text>Số lượng: {item.quantity}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
     <Text style={styles.paymentMethodLabel}>* Hình thức thanh toán:</Text>

{paymentMethods.map((method) => (
  <TouchableOpacity
    key={method.value}
    style={styles.paymentMethodRow}
    onPress={() => handlePaymentMethodSelection(method.value)}
  >
    <FontAwesomeIcon
      icon={paymentMethod === method.value ? faCheckCircle : faCircle}
      size={20}
      color={paymentMethod === method.value ? 'green' : 'black'}
    />
    <Text style={styles.paymentMethodText}>{method.label}</Text>
  </TouchableOpacity>
))}

      <Button title="Xác nhận đơn hàng" onPress={handleOrderConfirmation} />

    </View>
  );
}
const paymentMethods = [
  { label: 'Thanh toán bằng tiền mặt', value: 'cash' },
  { label: 'Thanh toán bằng chuyển khoản', value: 'bank_transfer' },
  { label: 'Thanh toán bằng thẻ', value: 'credit_card' },
 
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  customerInfoContainer: {
    marginBottom: 20,
  },
  customerInfoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  customerInfoLabel: {
    fontSize: 17,
    marginBottom: 20,
   
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    marginBottom: 8,
  },
  paymentMethodLabel: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom:17,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
   
  },
  paymentMethodText: {
    fontSize: 17,
    marginLeft: 8,
  },
  
});

export default OrderScreen;
