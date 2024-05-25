import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface HeaderForgotProps {
  title: string;
  title2: string;
}

const HeaderForgot: React.FC<HeaderForgotProps> = ({title, title2}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title2}>{title2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default HeaderForgot;
