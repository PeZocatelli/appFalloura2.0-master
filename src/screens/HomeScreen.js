import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform, Modal, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import StatusBarSim from '../components/StatusBarSim';

export default function HomeScreen() {
  const navigation = useNavigation();

  // Hooks
  const [modalVisible, setModalVisible] = useState(false); // WhatsApp
  const [modalAlertaVisible, setModalAlertaVisible] = useState(false); // Alerta
  const [mensagem, setMensagem] = useState('');

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.bg}>
      <View style={styles.overlay} />
      <StatusBarSim />

      <View style={styles.container}>
        <BlurView intensity={30} tint="light" style={styles.logoBox}>
          <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
        </BlurView>

        {/* Ícones de navegação rápida */}
        <View style={styles.iconRowMiddle}>
          {/* BOTÃO NOTIFICAÇÃO */}
          <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
            <Image source={require('../../assets/notificação.png')} style={styles.smallIcon} />
          </TouchableOpacity>

          {/* BOTÃO ALERTA */}
          <TouchableOpacity style={styles.iconButton} onPress={() => setModalAlertaVisible(true)}>
            <Image source={require('../../assets/alerta.png')} style={styles.smallIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}
            onPress={() => navigation.navigate('Historico')}
          >
            <Image source={require('../../assets/queda.png')} style={styles.smallIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} 
            onPress={() => navigation.navigate('LocalAtual')}
          >
            <Image source={require('../../assets/mapa.png')} style={styles.smallIcon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('DadosAtuais')}
          >
            <Image source={require('../../assets/iconevelho.png')} style={styles.smallIcon} />
          </TouchableOpacity>
        </View>

        {/* Botões principais */}
        <View style={styles.buttonsContainer}>
          <BlurView intensity={70} tint="light" style={styles.card}>
            <TouchableOpacity   
              style={styles.cardContent}
              onPress={() => navigation.navigate('Monitoramento')}
            >
              <Image source={require('../../assets/monitoramento.png')} style={styles.largeIcon} />
              <Text style={styles.cardText}>MONITORAMENTO</Text>
            </TouchableOpacity>
          </BlurView>

          <BlurView intensity={70} tint="light" style={styles.card}>
            <TouchableOpacity 
              style={styles.cardContent}
              onPress={() => navigation.navigate('Emergencia')}
            >
              <Image source={require('../../assets/emergencia.png')} style={styles.largeIcon} />
              <Text style={styles.cardText}>EMERGÊNCIA</Text>
            </TouchableOpacity>
          </BlurView>
        </View>

        <View style={styles.spacer} />
      </View>

      {/* MODAL WHATSAPP */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Mandar mensagem para WhatsApp</Text>
              <Text style={styles.modalSubtitle}>Paulo Cesar</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>×</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Digite a mensagem..."
              placeholderTextColor="#888"
              multiline
              value={mensagem}
              onChangeText={setMensagem}
            />

            <TouchableOpacity
              style={styles.enviarButton}
              onPress={() => {
                setModalVisible(false);
                setMensagem('');
              }}
            >
              <Text style={styles.enviarText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL ALERTA */}
      <Modal visible={modalAlertaVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nenhum evento recente</Text>
              <Text style={styles.modalSubtitle}>Paulo Cesar</Text>
              <Text style={styles.modalSubtitle}>Horário do último evento registrado: 14:53</Text>
              <TouchableOpacity onPress={() => setModalAlertaVisible(false)} style={styles.closeButton}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>×</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.enviarButton}
              onPress={() => {
                setModalAlertaVisible(false);
                setMensagem('');
              }}
            >
              <Text style={styles.enviarText}>Ligar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.15)' },
  container: { flex: 1, zIndex: 1, paddingTop: 60, alignItems: 'center', paddingHorizontal: 20 },
  logoBox: {
    width: '95%', height: 150, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)', marginBottom: 25,
  },
  logoImage: { width: '80%', height: '80%' },
  iconRowMiddle: { flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginBottom: 40 },
  iconButton: {
    width: 50, height: 50, borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center',
  },
  smallIcon: { width: 26, height: 26, tintColor: '#444' },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '95%' },
  card: {
    width: '48%', height: 180, borderRadius: 20, overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  cardContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  largeIcon: { width: 50, height: 50, marginBottom: 10, tintColor: '#000' },
  cardText: { color: '#000', fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase' },
  spacer: { flex: 1, paddingBottom: 80 },

  // Modais
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
  },
  modalHeader: { marginBottom: 15 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  modalSubtitle: { fontSize: 14, color: '#555' },
  closeButton: { position: 'absolute', top: 5, right: 10 },
  input: {
    backgroundColor: '#DFF6FF',
    borderRadius: 12,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 15,
    color: '#000',
  },
  enviarButton: {
    backgroundColor: '#00BFFF',
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: 10,
  },
  enviarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
