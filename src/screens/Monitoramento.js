// src/screens/DadosAtuaisScreen.js

import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import StatusBarSim from '../components/StatusBarSim';

export default function DadosAtuaisScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.bg}>
      <View style={styles.overlay} />
      <StatusBarSim />

      <View style={styles.container}>
        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BlurView intensity={40} tint="light" style={styles.backBlur}>
            <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
          </BlurView>
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.title}>DADOS DO DISPOSITIVO</Text>

        {/* Avatar e nome */}
        <Image
          source={require('../../assets/avatar.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Paulo Cesar</Text>

        {/* Estado atual do dispositivo */}
        <Text style={styles.sectionTitle}>Estado atual do dispositivo</Text>

        <View style={styles.iconRow}>
          <Image source={require('../../assets/correto.png')} style={styles.iconState} />
          <Image source={require('../../assets/alerta.png')} style={styles.iconState} />
          <Image source={require('../../assets/problemaConexao.png')} style={styles.iconState} />
          <Image source={require('../../assets/Bateria.png')} style={styles.iconState} />
        </View>

        {/* Última atualização */}
        <Text style={styles.updateText}>Última atualização :</Text>
        <Text style={styles.updateTime}>há 2 minutos</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)' },

  container: { flex: 1, alignItems: 'center', paddingTop: 60, zIndex: 1 },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 10,
  },
  backBlur: {
    width: 35,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { width: 18, height: 18, tintColor: '#000' },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 25,
    textAlign: 'center',
  },

  avatar: {
    width: 85,
    height: 85,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },

  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  iconState: {
    width: 28,
    height: 28,
    tintColor: '#000',
  },

  updateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    opacity: 0.9,
  },
  updateTime: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
});
