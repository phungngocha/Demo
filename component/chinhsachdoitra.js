import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function chinhsachdoitra() {
  return (
    <View style={styles.container}>
      <Text>Đây là Chính Sách đổi trả của chúng tôi:</Text>
      {/* Thêm thông tin chi tiết về chính sách bảo mật ở đây */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default chinhsachdoitra;
