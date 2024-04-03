import React, {useState, useEffect} from 'react';
import { View, 
  Text,
   StyleSheet, 
   FlatList,
    SafeAreaView,
     StatusBar ,
     Image,
     TextInput,
     TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import uuDaiData from '../component/uudaiData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRug } from '@fortawesome/free-solid-svg-icons';

function uudaiScreen() {
    const navigation = useNavigation();
    const [selectedFilter, setSelectedFilter] = useState('all'); // Lưu trạng thái nút được chọn
    const [filteredUuDaiData, setFilteredUuDaiData] = useState(uuDaiData);
    const [expandedItem, setExpandedItem] = useState(null);
    const [promoCode, setPromoCode] = useState(''); // Thêm state cho mã ưu đãi

    useEffect(() => {
      filterData(selectedFilter);
    }, [selectedFilter]);
    const handleCornerButtonClick = (item) => {
      // Thực hiện các thao tác khi nhấn vào button ở góc dưới bên trái
      console.log('Button clicked for :', item);
      navigation.navigate('cart', { appliedPromo: item });
    };
    
   
    const renderItem = ({ item, index }) => (
      <View style={styles.uuDaiItem}>
           <Ionicons name="ios-gift" size={24} color="#900" style={styles.icon} />
        <Text style={styles.uuDaiText}>{item.title}</Text>
        <TouchableOpacity onPress={() => toggleExpansion(index)}>
        <Text style={styles.conditionText}>Điều kiện</Text>
      </TouchableOpacity>
      {expandedItem === index && (
        <Text style={styles.conditionInfo}>{item.condition}</Text>
      )}
       <TouchableOpacity style={styles.cornerButton} onPress={() => handleCornerButtonClick(item)}>
      <Text style={styles.cornerButtonText}>Sử dụng</Text>
    </TouchableOpacity>
      </View>
    );
    const filterData = (filter) => {
      if (filter === 'all') {
        setFilteredUuDaiData(uuDaiData);
      } else {
        const filteredData = uuDaiData.filter((item) => item.id === filter);
        setFilteredUuDaiData(filteredData);
      }
    };

    const handleFilterChange = (filter) => {
      // Xử lý thay đổi bộ lọc
      setSelectedFilter(filter);
      // Thực hiện các thao tác khác tùy thuộc vào bộ lọc được chọn
      setExpandedItem(null); // Đóng tất cả các mục đã mở khi chuyển bộ lọc
    };
    const toggleExpansion = (index) => {
      setExpandedItem((prev) => (prev === index ? null : index));
    };

    // Hàm xử lý khi nhập mã ưu đãi
  const handlePromoCodeChange = (text) => {
    setPromoCode(text);
  };

  // Hàm xử lý khi áp dụng mã ưu đãi
  const applyPromoCode = () => {
    // Thực hiện logic khi áp dụng mã ưu đãi
    console.log('Áp dụng mã ưu đãi:', promoCode);
    // Có thể gọi hàm kiểm tra mã ưu đãi và cập nhật danh sách ưu đãi tương ứng
  };
   
    
    return (
      <SafeAreaView style={styles.container}>
         <View style={styles.centeredTitle}>
          
       
        <Text style={styles.title}>ƯU ĐÃI</Text>
        <View style={styles.promoCodeContainer}>
          {/* Thêm FontAwesomeIcon trước tiêu đề ưu đãi */}
          <FontAwesomeIcon icon={faRug} size={35} color="black" style={styles.icon} />
        <TextInput
          style={styles.promoCodeInput}
          placeholder="Nhập mã ưu đãi"
          onChangeText={handlePromoCodeChange}
          value={promoCode}
        />
        <TouchableOpacity style={styles.applyButton} onPress={applyPromoCode}>
          <Text style={styles.applyButtonText}>Áp Dụng</Text>
        </TouchableOpacity>
      </View>
      </View>
         {/* Thanh menu nằm ngang */}
      <View style={styles.filterContainer}>
     
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'all' && styles.selectedButton]}
          onPress={() => handleFilterChange('all')}
        >
          <Text style={styles.filterButtonText}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'newest' && styles.selectedButton]}
          onPress={() => handleFilterChange('newest')}
        >
          <Text style={styles.filterButtonText}>Mới nhất</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'endingSoon' && styles.selectedButton]}
          onPress={() => handleFilterChange('endingSoon')}
        >
          <Text style={styles.filterButtonText}>Sắp hết hạn</Text>
        </TouchableOpacity>
      </View>
   

      <FlatList
           data={filteredUuDaiData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
        
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center', // Căn giữa theo chiều dọc
    backgroundColor: 'rgba(255, 99, 71, 0.8)', // Màu nền với độ trong suốt
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
   
    
  },
 //css cho phần nhập mã ưu đãi và áp dụng
 centeredTitle: {
  alignItems: 'center',
  marginBottom: 16,
},
promoCodeContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
  promoCodeInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  applyButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
  applyButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(255, 99, 71, 0.8)',
  },
  uuDaiItem: {
    backgroundColor: 'white', // Màu nền của mỗi phần tử trong danh sách
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
   
    justifyContent: 'space-between', // Thêm dòng này
    //alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  uuDaiText: {
    fontSize: 16,
  },
  conditionText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  flatList: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
   
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cornerButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  cornerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default uudaiScreen;
