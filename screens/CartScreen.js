import React, {useState, useEffect} from 'react';

import { View, 
  Text,
  FlatList,
  Image,
   StyleSheet,
  TouchableOpacity,
SafeAreaView,
StatusBar,
Modal,
TextInput,
Button,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faTags } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CartScreen({ route }) {
  const navigation = useNavigation();
  //const { total } = route.params;

  // Sử dụng useState để lưu trữ danh sách sách trong giỏ hàng
  const [cart, setCart] = useState([]);
  const [bookToAdd, setBookToAdd] = useState(null);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState('1');
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const { appliedPromo } = route.params || {};

  useEffect(() => {
    // Tải dữ liệu giỏ hàng từ AsyncStorage khi thành phần được tạo
    const loadCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          setCart(JSON.parse(cartData));
          const initialTotal = JSON.parse(cartData).reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          setTotal(initialTotal);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu giỏ hàng từ AsyncStorage:', error);
      }
    };

    loadCartData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
       <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
      
      <View style={styles.bookInfo}>
        <Text>Tên sách: {item.title}</Text>
        <Text>Tác giả: {item.author}</Text>
        <Text>Số lượng: {item.quantity}</Text>
        <Text>Giá: {item.price} </Text>
      </View>
      <Image source={item.image} style={styles.bookImage} />
    </View>
  );

  const deleteItem = (bookId) => {
    
    const deletedBook = cart.find((item) => item.id === bookId);
    const currentQuantity = deletedBook ? deletedBook.quantity : 0;
  
    // Tính giảm tổng tiền bằng giá của sách nhân với số lượng sách đã xóa
    const priceToSubtract = deletedBook ? deletedBook.price * currentQuantity : 0;
  
    // Lấy tổng tiền hiện tại và trừ đi giá của sách đã xóa
    const updatedTotal = total - priceToSubtract;
  
    // Lọc sách cần xóa ra khỏi giỏ hàng
    const updatedCart = cart.filter((item) => item.id !== bookId);
  
    // Cập nhật giỏ hàng và tổng tiền
    setCart(updatedCart);
    // Nếu không còn sách trong giỏ hàng, tổng tiền được đặt về 0
    setTotal(updatedCart.length > 0 ? updatedTotal : 0);
  };

  const addToCart = () => {
    if (bookToAdd) {
      const quantity = parseInt(quantityToAdd, 10) || 1;

      const existingBook = cart.find((item) => item.id === bookToAdd.id);

      if (existingBook) {
        const updatedCart = cart.map((item) =>
          item.id === bookToAdd.id ? { ...item, quantity: item.quantity + quantity } : item
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...bookToAdd, quantity }]);
      }

      setBookToAdd(null);
      setShowAddToCartModal(false);
    }
  };

  const buyMore = () => {
    // Truy cập thông tin sách trực tiếp từ tham số route
    const { bookDetails } = route.params;

    const existingBook = cart.find((item) => item.id === bookDetails.id);

    if (existingBook) {
      // Nếu sách đã tồn tại trong giỏ hàng, chỉ cập nhật quantity
      const updatedCart = cart.map((item) =>
        item.id === bookDetails.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Nếu sách chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng
      setCart([...cart, { ...bookDetails, quantity: 1 }]);
    }

    // Chuyển về trang chủ
    navigation.navigate('Home');
  };

  const handleGoBack = () => {
    // Quay lại trang trước đó
    navigation.goBack();
  };

  const handleAddToCart = (book) => {
    setBookToAdd(book);
    setShowAddToCartModal(true);
  };
  const handleCheckout = () => {
    // Thực hiện logic thanh toán ở đây
    // Sau khi thanh toán thành công, bạn có thể đặt lại giỏ hàng về rỗng hoặc lưu trữ lịch sử đơn hàng
    setCart([]);
    // Chuyển đến màn hình xác nhận đơn hàng hoặc màn hình khác tùy thuộc vào yêu cầu của ứng dụng
    navigation.navigate('Order', { total, cart });
  };

  const navigateToPromoScreen = () => {
    // Chuyển sang màn hình ưu đãi khi click vào nút mã giảm giá
    navigation.navigate('uudai');
  };
  
  const applyPromoCode = () => {
    const soNgauNhien = Math.floor(Math.random() * 100) + 1; // Bạn có thể điều chỉnh khoảng cách theo cần thiết
     // Cập nhật tổng với số ngẫu nhiên
  setTotal(soNgauNhien);
    // Thực hiện logic khi áp dụng mã ưu đãi
    console.log('Áp dụng mã ưu đãi:', promoCode);
    console.log('Tổng mới:', soNgauNhien);
    setPromoCode('');

  // Tùy chọn: Bạn có thể muốn đặt một cờ chỉ định rằng mã giảm giá đã được áp dụng
  setIsPromoApplied(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredTitle}>
        {/* Nút quay lại */}
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>GIỎ HÀNG</Text>
      </View>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    

<View style={styles.promoContainer}>
      <Text style={styles.headerTextone}>*Chọn mã giảm giá:</Text>
     
      <TouchableOpacity style={styles.promoButton} onPress={navigateToPromoScreen}>
        <Text style={styles.promoButtonText}>Chọn mã giảm giá</Text>
      </TouchableOpacity>
      <FontAwesomeIcon icon={faTags} size={24} color="black" style={styles.icon} />
      <Text style={styles.appliedPromoText}>{appliedPromo ? appliedPromo.title : ''}</Text>
      <TouchableOpacity style={styles.applyPromoButton} onPress={applyPromoCode}>
    <Text style={styles.applyPromoButtonText}>Áp dụng</Text>
  </TouchableOpacity>
      {/* ... Các mãng hiển thị khác ... */}
    </View>
    
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng tiền: {total}</Text>
        </View>
        <TouchableOpacity style={styles.buyMoreButton} onPress={buyMore}>
          <Text style={styles.buyMoreButtonText}>Mua thêm</Text>
        </TouchableOpacity>
      </View>
        {/* Nút thanh toán */}
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>

      {/* Modal để nhập số lượng khi thêm sách mới vào giỏ hàng */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddToCartModal}
        onRequestClose={() => setShowAddToCartModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nhập số lượng</Text>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={quantityToAdd}
              onChangeText={(text) => setQuantityToAdd(text)}
            />
            <Button title="Thêm vào giỏ hàng" onPress={addToCart} />
          </View>
        </View>
      </Modal>

     

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    
  },
  goBackButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'gray',
    padding: 3,
    borderRadius: 8,
    zIndex: 1, // Để nút quay lại nằm trên hình ảnh
  },
 
 //css cho phần nhập mã ưu đãi và áp dụng
  centeredTitle: {
      alignItems: 'center',
       marginBottom: 20,
   },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  bookImage: {
    width: 80,
    height: 120,
    resizeMode: 'cover',
    marginRight: 10,
  },
  bookInfo: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  
  totalContainer: {
    
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyMoreButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyMoreButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold', // Đã chỉnh sửa độ đậm
    marginBottom: 16,
  },
  headerTextone:{
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom:10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    width: 200,
  },
  checkoutButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  promoContainer: {
    flexDirection: 'colum',
   
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  promoButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  promoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  appliedPromoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green', // Adjust the color for applied promo text
    marginBottom: 10,
  },
  applyPromoButton: {
    backgroundColor: 'orange', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, 
  },
  applyPromoButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
