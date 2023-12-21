// InvoiceScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function InvoiceScreen({ route }) {
  const navigation= useNavigation();
  
  const {
    customerName,
    phoneNumber,
    shippingAddress,
    total,
    cart,
    paymentMethod,
    paymentStatus 
  } = route.params;

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
        <Text style={styles.headerText}>Hóa đơn của bạn</Text>
        
      </View>
      <Text style={styles.invoiceInfo}>Họ và Tên: {customerName}</Text>
      <Text style={styles.invoiceInfo}>Số Điện Thoại: {phoneNumber}</Text>
      <Text style={styles.invoiceInfo}>Địa Chỉ Giao Hàng: {shippingAddress}</Text>

      <Text style={styles.invoiceInfo}>Thông tin sách:</Text>
      <View style={styles.bookInfoContainer}>
        <Text style={styles.bookInfoHeader}>Tên sách</Text>
        <Text style={styles.bookInfoHeader}>Số lượng</Text>
        <Text style={styles.bookInfoHeader}>Tác giả</Text>
        <Text style={styles.bookInfoHeader}>Thể loại</Text>
      </View>
      {cart.map((item) => (
        <View style={styles.bookInfoContainer} key={item.id}>
          <Text style={styles.bookInfo}>{item.title}</Text>
          <Text style={styles.bookInfo}>{item.quantity}</Text>
          <Text style={styles.bookInfo}>{item.author}</Text>
          <Text style={styles.bookInfo}>{item.category}</Text>
        </View>
      ))}

     
      <Text style={styles.invoiceInfo}>Hình thức thanh toán: {paymentMethod}</Text>
      <Text style={styles.invoiceInfo}>Trạng thái thanh toán: {paymentStatus}</Text>
      <Text style={styles.invoiceInfo}>Tổng tiền: {total}</Text>
      {/* Thêm nội dung bổ sung cho màn hình hóa đơn của bạn */}
      <Text style={styles.sectionHeader}>Thông tin cửa hàng:</Text>
      <Text style={styles.shopInfo}>Địa chỉ: Shop sách HD- Trường đại học Điện Lực</Text>
      <Text style={styles.shopInfo}>Số điện thoại:0435567932</Text>

      <Text style={styles.sectionHeader}>Thông tin liên hệ:</Text>
      <Text style={styles.contactInfo}>Email: shophd123@gmail.com</Text>
      <Text style={styles.contactInfo}>Số điện thoại: 5346537485</Text>
    </View>
  );
}

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
    marginLeft: 8,
  },
  invoiceInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  bookInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  bookInfoHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 5,
  },
  bookInfo: {
    fontSize: 16,
    flex: 1,
    marginRight: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  shopInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  // Thêm các kiểu khác cần thiết
});

export default InvoiceScreen;
