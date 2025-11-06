import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatusBarSim() {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.text}>FALLORA</Text>
      <View style={styles.icons}>
        <Ionicons name="cellular" size={16} color="#fff" />
        <Ionicons name="wifi" size={16} color="#fff" />
        <Ionicons name="battery-half" size={18} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  text: { color: '#fff', fontWeight: 'bold' },
  icons: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
