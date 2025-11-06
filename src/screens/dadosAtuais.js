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

        {/* --- Título com mesmo estilo de DadosFixos --- */}
        <Text style={styles.title}>DADOS ATUAIS</Text>

        {/* Conteúdo principal */}
        <View style={styles.content}>
          <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
          <Text style={styles.name}>Paulo Cesar</Text>

          {/* Card - Batimentos */}
          <BlurView intensity={70} tint="light" style={styles.card}>
            <View style={styles.cardRow}>
              <Image source={require('../../assets/heartBeat.png')} style={styles.icon} />
              <Text style={styles.cardText}>80bpm</Text>
            </View>
          </BlurView>

          {/* Card - Posição */}
          <BlurView intensity={70} tint="light" style={styles.card}>
            <View style={styles.cardRow}>
              <Image source={require('../../assets/sitting_person.png')} style={styles.icon} />
              <Text style={styles.cardText}>Sentado</Text>
            </View>
          </BlurView>

          {/* Card - Ver mais */}
          <BlurView intensity={70} tint="light" style={styles.cardSmall}>
            <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('LocalAtual')}>
              <Image source={require('../../assets/mapa.png')} style={styles.iconSmall} />
              <Text style={styles.cardTextSmall}>Ver mais</Text>
            </TouchableOpacity>
          </BlurView>

          <Text style={styles.updateText}>Última atualização :{"\n"}há 2 minutos</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.15)' },

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

  content: {
    alignItems: 'center',
    marginTop: 10, // reduzido pois o título já ocupa espaço
  },

  // 🔹 Título agora igual ao de DadosFixos (MONITORAMENTO)
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginTop: 0,
    marginBottom: 20,
    textAlign: 'center',
  },

  avatar: {
    width: 90,
    height: 90,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 25,
  },

  card: {
    width: 200,
    height: 55,
    borderRadius: 15,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.35)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 6 },
      android: { elevation: 6 },
    }),
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  icon: { width: 28, height: 28, tintColor: '#000' },
  cardText: { fontSize: 18, fontWeight: '700', color: '#000' },

  cardSmall: {
    width: 120,
    height: 45,
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  iconSmall: { width: 22, height: 22, tintColor: '#000' },
  cardTextSmall: { fontSize: 14, fontWeight: '600', color: '#000' },

  updateText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
    opacity: 0.9,
  },
});