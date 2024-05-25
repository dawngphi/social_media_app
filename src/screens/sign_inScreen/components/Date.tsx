import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const GenderDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.sex}>Sex</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select your gender"
      />
    </View>
  );
};

export default GenderDropdown;

const styles = StyleSheet.create({
  sex: {
    color: '#000',
    fontSize: 16,
    marginBottom: 10,
  },
  
  container: {
    // Bạn có thể tùy chỉnh style cho container nếu cần
    marginBottom: 20,
  },
});