import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Componente para um cartão de histórico (Evento de Queda)
// CORREÇÃO: Recebe 'navigation' como prop
const FallHistoryCard = ({ local, horario, grau, navigation }) => {
  return (
    <BlurView intensity={20} tint="dark" style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Dados da queda:</Text>
        <Image source={require('../../assets/Exemplo 1.png')} style={styles.mapImage} />
        <Text style={styles.cardText}>Horario: {horario}</Text>
        <Text style={styles.cardText}>Grau da queda: {grau}</Text>
        {/* CORREÇÃO: Usa navigation.navigate('DadosQuedasScreen') */}
        <TouchableOpacity style={styles.verMaisButton} onPress={() => navigation.navigate('DadosQueda')} >
          <Text style={styles.verMaisButtonText}>Ver mais</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

export default function HistoricoScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.bg}>
      <StatusBar style="dark" />
      <View style={styles.overlay} />

      <View style={styles.container}>
        
        {/* CONTÊINER DO CABEÇALHO */}
        <View style={styles.headerContainer}> 
            {/* Botão Voltar */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <BlurView intensity={40} tint="light" style={styles.backBlur}>
                    <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
                </BlurView>
            </TouchableOpacity>

            {/* --- Título alinhado --- */}
            <Text style={styles.title}>Historico de queda</Text>
        </View>

        {/* Conteúdo principal - AGORA ESCROLÁVEL */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* CORREÇÃO: Passando a prop navigation={navigation} para cada card */}
          <FallHistoryCard navigation={navigation} local="Rua Exemplo, 123" horario="11h 11min" grau="baixo" />
          <FallHistoryCard navigation={navigation} local="Av. Teste, 456" horario="17h 12min" grau="baixo" />
          <FallHistoryCard navigation={navigation} local="Praça da Liberdade" horario="09h 30min" grau="médio" />
          <FallHistoryCard navigation={navigation} local="Rua do Desenvolvedor, 789" horario="14h 05min" grau="alto" />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.15)' },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 0, 
    zIndex: 1,
  },

  // Contêiner que alinha o botão e o título
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: Platform.OS === 'android' ? 70 : 100, 
    paddingHorizontal: 25,
    marginBottom: 30, 
  },

  backButton: {
    position: 'absolute', 
    left: 25,
    zIndex: 10,
  },
  backBlur: {
    width: 35,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backIcon: { width: 18, height: 18, tintColor: '#000' },

  title: {
    fontSize: 22, 
    fontWeight: '700',
    color: '#000', 
    textAlign: 'center',
  },

  // Estilos para o ScrollView
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center', 
  },

  // Estilos para os cartões de Glassmorfismo
  cardContainer: {
    width: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  mapImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  cardText: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  verMaisButton: {
    backgroundColor: '#00C8F8',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 15,
  },
  verMaisButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});