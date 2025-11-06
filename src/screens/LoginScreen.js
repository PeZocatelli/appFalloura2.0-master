import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground, Platform } from 'react-native';

// Importa o LinearGradient com fallback para web
let LinearGradient;
try {
  ({ LinearGradient } = require('expo-linear-gradient'));
} catch (e) {
  console.warn("Using LinearGradient fallback.");
  LinearGradient = ({ children, style, colors }) => (
    <View style={[style, { backgroundColor: colors ? colors[0] : '#4361EE' }]}>
      {children}
    </View>
  );
}

export default function LoginScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.bg}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.form}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />
          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Text style={styles.label}>Senha:</Text>
          <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
<TouchableOpacity onPress={() => navigation.replace('HomeScreen')}>
  <LinearGradient colors={['#00CFFF', '#4361EE']} style={styles.btn}>
    <Text style={styles.btnText}>ENTRAR</Text>
  </LinearGradient>
</TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 1,
  },
  logo: { width: 180, height: 80, marginBottom: 30 },
  form: { width: '80%' },
  label: { color: '#FFF', fontWeight: '600', marginTop: 10, fontSize: 16 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 5,
    fontSize: 16,
    color: '#000',
  },
  btn: {
    marginTop: 25,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#00CFFF',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
