import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform, ScrollView } from 'react-native'; // Adicionado ScrollView
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'; // Usando StatusBar do expo-status-bar

// Componente para o cartão de Localização Atual
const LocalAtualCard = ({ nome, bpm, estado }) => {
    return (
        <BlurView intensity={20} tint="dark" style={styles.cardContainer}>
            <View style={styles.cardContent}>
                <Text style={styles.cardSectionTitle}>Localização de {nome}</Text>
                
                {/* Mapa da Localização Atual */}
                <Image source={require('../../assets/Exemplo 1.png')} style={styles.mapImage} /> 
                
                <View style={styles.infoRow}>
                    <Text style={styles.cardText}>Batimentos cardíacos: <Text style={styles.dataHighlight}>{bpm}</Text></Text>
                    <Text style={styles.cardText}>Estado: <Text style={styles.dataHighlight}>{estado}</Text></Text>
                </View>
            </View>
        </BlurView>
    );
};

// Componente para o cartão de Último Repouso
const RepousoCard = ({ tempoParado }) => {
    return (
        <BlurView intensity={20} tint="dark" style={styles.cardContainer}>
            <View style={styles.cardContent}>
                <Text style={styles.cardSectionTitle}>Último local de repouso</Text>
                
                {/* Mapa do Último Repouso */}
                <Image source={require('../../assets/Exemplo 2.png')} style={styles.mapImage} /> 
                
                <View style={styles.legendContainer}>
                    <Text style={styles.legendText}>Tempo parado: <Text style={styles.dataHighlight}>{tempoParado}</Text></Text>
                </View>
            </View>
        </BlurView>
    );
};


export default function LocalRealScreen() { // Renomeado o componente principal
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.bg}>
      <StatusBar style="dark" />
      <View style={styles.overlay} />

      <View style={styles.container}>
        
        {/* CONTÊINER DO CABEÇALHO (Botão e Título) */}
        <View style={styles.headerContainer}> 
            {/* Botão Voltar */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <BlurView intensity={40} tint="light" style={styles.backBlur}>
                    <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
                </BlurView>
            </TouchableOpacity>

            {/* Título da Tela */}
            <Text style={styles.title}>Local Atual</Text>
        </View>

        {/* Conteúdo principal - ESCROLÁVEL */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <LocalAtualCard
                nome="Paulo Cesar"
                bpm="87"
                estado="movimento"
            />
            
            <RepousoCard
                tempoParado="32 min"
            />
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

    // ------------------------------------
    // ESTILOS DO CABEÇALHO
    // ------------------------------------
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

    // ------------------------------------
    // ESTILOS DO CONTEÚDO
    // ------------------------------------
    scrollContent: {
        paddingBottom: 40, // Espaçamento inferior padrão
        alignItems: 'center', 
    },
    
    // Estilos para os cartões de Glassmorfismo
    cardContainer: {
        width: 320, 
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 30, // Espaço entre os cartões
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    cardContent: {
        padding: 20,
        alignItems: 'center',
    },
    cardSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    mapImage: {
        width: '100%',
        height: 180, // Mapa um pouco maior
        borderRadius: 10,
        marginBottom: 15,
        resizeMode: 'cover',
    },
    infoRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between', // Espalha as informações
        paddingHorizontal: 10,
    },
    cardText: {
        fontSize: 16, 
        color: '#FFF',
        fontWeight: '500', 
        // marginBottom: 10, Removido para usar infoRow
    },
    dataHighlight: {
        fontWeight: 'bold',
        color: '#00C8F8', // Cor de destaque para os dados (ex: BPM)
    },
    legendContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },
    legendText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '500',
    }
});