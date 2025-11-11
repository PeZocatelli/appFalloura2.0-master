import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// --- Dados Iniciais para o Modal (Simulação de Estado) ---
const INITIAL_DATA = {
    nome: 'Paulo Cezar',
    idade: '79 anos',
    endereco: 'Rua Exemplo, 123',
    problemas: 'Nenhum',
};

// Componente para o Rádio Button
const RadioButton = ({ selected, onPress }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
        <View style={styles.radioOuterCircle}>
            {selected ? <View style={styles.radioInnerCircle} /> : null}
        </View>
    </TouchableOpacity>
);

// Componente do Modal de Edição (Novo)
const EditDataModal = ({ visible, onClose, initialData, onSave }) => {
    // Usamos useState para gerenciar os campos do modal
    const [formData, setFormData] = useState(initialData);

    const handleSave = () => {
        // Aqui você faria a validação e chamaria a API para salvar
        onSave(formData);
        onClose();
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <BlurView intensity={30} tint="dark" style={styles.modalView}>
                    <Text style={styles.modalTitle}>Alterar Dados Pessoais</Text>

                    {/* Input: Nome */}
                    <Text style={styles.inputLabel}>Nome:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleChange('nome', text)}
                        value={formData.nome}
                        placeholderTextColor="#AAA"
                    />
                    
                    {/* Input: Idade */}
                    <Text style={styles.inputLabel}>Idade:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleChange('idade', text)}
                        value={formData.idade}
                        keyboardType="numeric"
                        placeholderTextColor="#AAA"
                    />

                    {/* Input: Endereço */}
                    <Text style={styles.inputLabel}>Endereço:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleChange('endereco', text)}
                        value={formData.endereco}
                        placeholderTextColor="#AAA"
                    />

                    {/* Input: Problemas */}
                    <Text style={styles.inputLabel}>Problemas de saúde:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleChange('problemas', text)}
                        value={formData.problemas}
                        placeholderTextColor="#AAA"
                    />

                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity 
                            style={[styles.modalButton, { backgroundColor: '#c3e7e2ff' }]} 
                            onPress={onClose}
                        >
                            <Text style={styles.resetButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.modalButton, { backgroundColor: '#00C8F8' }]} 
                            onPress={handleSave}
                        >
                            <Text style={styles.resetButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
        </Modal>
    );
};

// Componente para o Card de Alterar Dados
const AlterarDadosCard = ({ userData, onEditPress }) => {
    // Agora o card só exibe os dados e tem um botão para disparar o modal
    return (
        <BlurView intensity={20} tint="dark" style={styles.cardContainer}>
            <View style={styles.cardContent}>
                <Text style={styles.cardHeaderTitle}>Alterar dados</Text>
                
                {/* Exibindo os dados atuais */}
                <Text style={styles.cardText}>Nome: <Text style={styles.dataDisplay}>{userData.nome}</Text></Text>
                <Text style={styles.cardText}>Idade: <Text style={styles.dataDisplay}>{userData.idade}</Text></Text>
                <Text style={styles.cardText}>Endereço: <Text style={styles.dataDisplay}>{userData.endereco}</Text></Text>
                <Text style={styles.cardText}>Problemas: <Text style={styles.dataDisplay}>{userData.problemas}</Text></Text>

                {/* Botão para abrir o modal */}
                <TouchableOpacity style={styles.resetButton} onPress={onEditPress}>
                    <Text style={styles.resetButtonText}>Editar Dados</Text>
                </TouchableOpacity>
            </View>
        </BlurView>
    );
};


export default function ConfiguracaoScreen() {
    const navigation = useNavigation();
    const [receberNotificacoes, setReceberNotificacoes] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState(INITIAL_DATA); // Novo estado para os dados

    const handleLogout = () => {
        navigation.navigate('Login'); 
    };

    const handleSaveData = (newData) => {
        setUserData(newData);
        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    };

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={styles.bg}>
            <StatusBar style="dark" />
            <View style={styles.overlay} />

            <View style={styles.container}>
                
                {/* Cabeçalho */}
                <View style={styles.headerContainer}> 
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <BlurView intensity={40} tint="light" style={styles.backBlur}>
                            <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
                        </BlurView>
                    </TouchableOpacity>
                    <Text style={styles.title}>Configuração</Text>
                </View>

                {/* Conteúdo principal - ESCROLÁVEL */}
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    
                    {/* Alterar Dados Card - Agora chama o modal */}
                    <AlterarDadosCard 
                        userData={userData} 
                        onEditPress={() => setModalVisible(true)} 
                    />

                    {/* Seção Receber Notificações */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Receber notificações</Text>
                        
                        <View style={styles.radioGroup}>
                            <RadioButton selected={receberNotificacoes} onPress={() => setReceberNotificacoes(true)} />
                            <Text style={styles.radioText}>sim</Text>
                        </View>

                        <View style={styles.radioGroup}>
                            <RadioButton selected={!receberNotificacoes} onPress={() => setReceberNotificacoes(false)} />
                            <Text style={styles.radioText}>não</Text>
                        </View>
                    </View>

                    {/* Botão Deslogar */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Deslogar</Text>
                    </TouchableOpacity>
                    
                </ScrollView>
            </View>

            {/* Modal de Edição */}
            <EditDataModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                initialData={userData}
                onSave={handleSaveData}
            />
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
    // ESTILOS DO CABEÇALHO (Mantidos)
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
        paddingBottom: 100,
        alignItems: 'center', 
    },

    // Estilos do Card (Alterar Dados)
    cardContainer: {
        width: 300, 
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 30, 
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    cardContent: {
        padding: 20,
        alignItems: 'flex-start',
    },
    cardHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    cardText: {
        fontSize: 16, 
        color: '#000',
        fontWeight: '500', 
        marginBottom: 10,
        textAlign: 'left',
    },
    dataDisplay: {
        fontWeight: 'normal', // Deixa o valor menos negrito que o label
    },
    // Botão para ABRIR O MODAL
    resetButton: {
        backgroundColor: '#00C8F8', 
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 20,
        alignSelf: 'center', 
    },
    resetButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Estilos da Seção de Notificações (Mantidos)
    sectionContainer: {
        width: 300,
        alignItems: 'flex-start',
        marginBottom: 50,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioText: {
        fontSize: 16,
        color: '#000',
        marginLeft: 10,
    },
    radioContainer: {
        padding: 5,
    },
    radioOuterCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInnerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
    // Estilos do Botão Deslogar (Mantidos)
    logoutButton: {
        width: 300,
        backgroundColor: '#00C8F8', 
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logoutButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // ------------------------------------
    // ESTILOS DO MODAL
    // ------------------------------------
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro
    },
    modalView: {
        width: '85%',
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden',
        // Estilos para simular o Glassmorfismo no modal (o BlurView ajuda muito)
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#CCC',
        color: '#000',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 30,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25,
    },
});