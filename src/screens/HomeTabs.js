import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeTabs({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Bem-vindo à HomeTabs!</Text>
      
      <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Login')}>
        <Text style={styles.btnText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: '#4361EE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
