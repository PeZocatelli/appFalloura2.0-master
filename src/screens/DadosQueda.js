// src/screens/DadosQuedasScreen.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Componente para o cartão de "Registro da Queda"
const RegistroQuedaCard = ({ bpm, queda, estado, impacto }) => {
    return (
        <BlurView intensity={20} tint="dark" style={styles.cardContainer}>
            <View style={styles.cardContent}>
                <Image source={require('../../assets/Exemplo 1.png')} style={styles.mapImage} /> 
                <Text style={styles.cardText}>Media de BPM: {bpm}</Text>
                <Text style={styles.cardText}>Queda: {queda}</Text>
                <Text style={styles.cardText}>Estado da queda: {estado}</Text>
                <Text style={styles.cardText}>Grau do imapcto: {impacto}</Text>
            </View>
        </BlurView>
    );
};

// Componente para o cartão de "Ponto de origem"
const PontoOrigemCard = ({ bpm }) => {
    return (
        // CORREÇÃO: Removido o ajuste { marginBottom: 0 } para que o cardContainer.marginBottom seja aplicado
        <BlurView intensity={20} tint="dark" style={styles.cardContainer}> 
            <View style={styles.cardContent}>
                {/* O mapa da imagem_8f8384.png */}
                <Image source={require('../../assets/Exemplo 2.png')} style={styles.mapImage} /> 
                <Text style={styles.cardText}>Media de BPM: {bpm}</Text>
                {/* Este card não tem botão "Ver mais" na imagem */}
            </View>
        </BlurView>
    );
};


export default function DadosQuedasScreen() {
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
                    <Text style={styles.title}>Registro da queda</Text>
                </View>

                {/* CONTEÚDO PRINCIPAL - ESCROLÁVEL */}
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    
                    {/* Primeiro Bloco de Informação: Registro da queda */}
                    <RegistroQuedaCard
                        bpm="92"
                        queda="50cm"
                        estado="Em pé"
                        impacto="baixo"
                    />

                    {/* Título "Último Ponto de repouso" (fora do card) */}
                    <Text style={styles.sectionTitle}>Último Ponto de repouso</Text>
                    {/* Segundo Bloco de Informação: Último Ponto de repouso */}
                    <PontoOrigemCard
                        bpm="72"
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
    // ESTILOS DO CABEÇALHO (COPIADOS DE HISTORICO.JS)
    // ------------------------------------
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? 70 : 100,
        paddingHorizontal: 25,
        marginBottom: 30, // Espaço antes do ScrollView
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
        paddingBottom: 100, // AUMENTADO: Garante que o conteúdo role acima da Tab Bar
        alignItems: 'center',
    },

    // TÍTULO DA SEÇÃO "Ponto de origem"
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        marginTop: 30, // Espaço em cima
        marginBottom: 30, // Espaço embaixo
        textAlign: 'center',
    },

    // Estilos para os cartões de Glassmorfismo
    cardContainer: {
        width: 300,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 40, // Espaço entre os cards
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    cardContent: {
        padding: 20,
        alignItems: 'flex-start', // Alinhamento à esquerda para os textos
    },
    mapImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 15,
        resizeMode: 'cover',
    },
    cardText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '500',
        marginBottom: 10,
        textAlign: 'left',
    },

    // Estilos de botão (mantidos)
    verMaisButton: {
        backgroundColor: '#00C8F8',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 15,
        alignSelf: 'center',
    },
    verMaisButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
})