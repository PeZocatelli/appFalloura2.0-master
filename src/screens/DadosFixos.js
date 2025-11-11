// src/screens/DadosFixos.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform, Dimensions, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import StatusBarSim from '../components/StatusBarSim'; 

const AVATAR_IMAGE = require('../../assets/avatar.png'); 
const MAP_IMAGE = require('../../assets/Local.png'); 

const screenWidth = Dimensions.get('window').width;

export default function MonitoramentoScreen() {
  const navigation = useNavigation();

  const GlassmorphicCard = ({ children, style }) => (
    <View style={[styles.glassCardBase, style]}>
      <View style={styles.cardOverlayColor} />
      <BlurView intensity={30} tint="light" style={styles.glassCardBlur}>
        {children}
      </BlurView>
    </View>
  );

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.bg}>
      <View style={styles.overlay} />
      <StatusBarSim />

      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BlurView intensity={40} tint="light" style={styles.backBlur}>
            <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
          </BlurView>
        </TouchableOpacity>

        <Text style={styles.title}>INFORMAÇÕES DE PAULO CESAR</Text>

        {/* Card 1 - Dados Principais */}
        <GlassmorphicCard style={styles.infoCard}>
          <View style={styles.infoContent}>
            <Image source={AVATAR_IMAGE} style={styles.avatar} />
            <View style={styles.textDataContainer}>
              <Text style={styles.nameText}>Paulo Cesar</Text>
              <Text style={styles.detailText}>79 anos de idade</Text>
              <Text style={styles.detailText}>Média de 71 bpm</Text>
              <Text style={styles.problemsText}>
                <Text style={{ fontWeight: '700' }}>Problemas:</Text> Nenhum
              </Text>
            </View>
          </View>
        </GlassmorphicCard>

        {/* Card 2 - Residência */}
        <GlassmorphicCard style={styles.residenceCard}>
          <Text style={styles.residenceTitle}>Residência de Paulo Cesar</Text>
          <View style={styles.mapContainer}>
            <Image source={MAP_IMAGE} style={styles.mapImage} resizeMode="cover" />
          </View>
        </GlassmorphicCard>

        <View style={{ height: 40 }} /> 
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // --- Fundo e layout principal ---
  bg: { flex: 1, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)' },
  scrollContainer: { 
    flexGrow: 1, 
    alignItems: 'center', 
    paddingTop: 60, 
    paddingHorizontal: 20, 
    paddingBottom: 20 
  },

  // --- Botão Voltar ---
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
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  backIcon: { width: 18, height: 18, tintColor: '#000' },

  // --- Título ---
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },

  // --- Card base com efeito glass ---
  glassCardBase: {
    width: screenWidth * 0.9,
    borderRadius: 20,
    marginVertical: 10,
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 10 },
      android: { elevation: 15 },
      web: { boxShadow: '0 8px 20px rgba(0,0,0,0.25)' },
    }),
  },
  cardOverlayColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(52, 73, 94, 0.7)',
  },
  glassCardBlur: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'flex-start',
  },

  // --- Card 1 - Informações principais ---
  infoCard: { minHeight: 180 },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
  },
  textDataContainer: { flex: 1 },
  nameText: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 5 },
  detailText: { fontSize: 16, color: '#eee', marginBottom: 5 },
  problemsText: { fontSize: 16, color: '#fff', marginTop: 10 },

  // --- Card 2 - Residência ---
  residenceCard: {
    minHeight: 160,
    justifyContent: 'flex-start',
    paddingBottom: 20, // ← garante espaçamento interno na parte inferior
  },
  residenceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  mapContainer: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapImage: {
    width: '100%',
    height: 100, // ← reduz altura da imagem para não encostar no "chão"
    borderRadius: 12,
  },
});