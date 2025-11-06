import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal, Dimensions, ScrollView, Platform 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import StatusBarSim from '../components/StatusBarSim';

const screenWidth = Dimensions.get('window').width;

export default function EmergenciaScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(null);

  const GlassButton = ({ icon, label, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.glassWrapper}>
      <BlurView intensity={50} tint="light" style={styles.glassButton}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.buttonLabel}>{label}</Text>
      </BlurView>
    </TouchableOpacity>
  );

  const ModalBox = ({ visible, text, buttonLabel, onConfirm }) => (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalText}>{text}</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.bg}>
      <View style={styles.overlay} />
      <StatusBarSim />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Botão Voltar e Título na mesma linha */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <BlurView intensity={40} tint="light" style={styles.backBlur}>
              <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
            </BlurView>
          </TouchableOpacity>
          <Text style={styles.title}>EMERGÊNCIA</Text>
        </View>

        {/* Grid de botões */}
        <View style={styles.grid}>
          <GlassButton icon={require('../../assets/alerta.png')} label="Alerta" onPress={() => setModalVisible('alerta')} />
          <GlassButton icon={require('../../assets/mapa.png')} label="Localização" onPress={() => setModalVisible('mapa')} />
          <GlassButton icon={require('../../assets/telefone.png')} label="Telefone" onPress={() => setModalVisible('telefone')} />
          <GlassButton icon={require('../../assets/familia.png')} label="Contatos" onPress={() => setModalVisible('grupo')} />
          <View style={styles.centeredButton}>
            <GlassButton icon={require('../../assets/ambulacia.png')} label="Ambulância" onPress={() => setModalVisible('ambulancia')} />
          </View>
        </View>
      </ScrollView>

      {/* Modais */}
      <ModalBox
        visible={modalVisible === 'alerta'}
        text={'Nome: Paulo Cesar\nHora do evento: 14:23?'}
        buttonLabel="Ligar para o idoso"
        onConfirm={() => setModalVisible(null)}
      />
      <ModalBox
        visible={modalVisible === 'mapa'}
        text={'Paulo Cesar caiu na rua Luiz Nani, Caçapava'}
        buttonLabel="Abrir no mapa"
        onConfirm={() => {
          setModalVisible(null);          
          navigation.navigate('LocalAtual'); 
        }}
      />
      <ModalBox
        visible={modalVisible === 'telefone'}
        text={'Ligar para Paulo Cesar\n(12) 99137-8442?'}
        buttonLabel="Ligar"
        onConfirm={() => setModalVisible(null)}
      />
      <ModalBox
        visible={modalVisible === 'grupo'}
        text={'Notificar seus contatos de emergência?'}
        buttonLabel="Notificar"
        onConfirm={() => setModalVisible(null)}
      />
      <ModalBox
        visible={modalVisible === 'ambulancia'}
        text={'Chamar uma ambulância?'}
        buttonLabel="Chamar"
        onConfirm={() => setModalVisible(null)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.15)' },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // Linha do topo: botão voltar + título
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    marginBottom: 20,
  },
  backButton: { marginRight: 90 },
  backBlur: {
    width: 35,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  backIcon: { width: 18, height: 18, tintColor: '#000' },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'left',
    flex: 1,
  },

  // Grid de botões
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  glassWrapper: {
    width: (screenWidth - 60) / 2,
    marginBottom: 15,
  },
  glassButton: {
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10 },
      android: { elevation: 10 },
    }),
  },
  icon: { width: 40, height: 40, marginBottom: 8, tintColor: '#000' },
  buttonLabel: { fontSize: 12, color: '#000', fontWeight: '600', textAlign: 'center' },
  centeredButton: {
    width: '100%',
    alignItems: 'center',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  confirmText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});