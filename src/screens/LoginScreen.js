import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
  ActivityIndicator // Importa o indicador de carregamento
} from 'react-native';

// ⚠️ MANTENHA ESTE CAMINHO CORRETO PARA O SEU ARQUIVO DE CONEXÃO
import { supabase } from '../screens/conexao'; 

// --- Configuração do LinearGradient (necessário para o seu estilo) ---
let LinearGradient;
try {
  ({ LinearGradient } = require('expo-linear-gradient'));
} catch {
  LinearGradient = ({ children, style, colors }) => (
    <View style={[style, { backgroundColor: colors ? colors[0] : '#4361EE' }]}>{children}</View>
  );
}
// ----------------------------------------------------------------------

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controle de loading
  
  // Referência para mover o foco para o campo de senha
  const passwordRef = useRef(null); 

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha e-mail e senha.');
      return;
    }

    setLoading(true); // Inicia o estado de carregamento

    try {
      // ⚠️ LINHA 44 (Aproximadamente) ONDE A CHAMADA REAL É FEITA
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: senha.trim(),
      });

      if (error) {
        let errorMessage = error.message;

        // Tratamento específico para o erro de credenciais inválidas (a causa mais provável do 400)
        if (errorMessage.includes('Invalid login credentials')) {
          errorMessage = 'Email ou senha inválidos. Tente novamente.';
        }
        
        Alert.alert('Erro de Login', errorMessage);
        return;
      }

      // Login OK
      Alert.alert('Bem-vindo!', 'Login realizado com sucesso.');
      navigation.replace('HomeTabs');

    } catch (err) {
      console.error("Erro inesperado ou de rede:", err);
      // Erro de rede ou outro problema grave
      Alert.alert('Erro', 'Falha ao conectar ao servidor. Verifique sua conexão.');
    } finally {
      setLoading(false); // Para o estado de carregamento
    }
  }

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.bg}>
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />

        <View style={styles.form}>
          <Text style={styles.title}>Entrar</Text>

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()} // Move o foco
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            ref={passwordRef} // Atribui a referência
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            editable={!loading}
            returnKeyType="go"
            onSubmitEditing={handleLogin} // Tenta logar
          />

          <TouchableOpacity onPress={handleLogin} disabled={loading}>
            <LinearGradient colors={['#00CFFF', '#4361EE']} style={styles.btn}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.btnText}>ENTRAR</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('CadastroScreen')}
            disabled={loading}
          >
            <Text style={styles.toggleText}>Não tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  container: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  logo: { width: 180, height: 80, marginBottom: 20 },
  form: { width: '80%' },
  title: { color: '#FFF', fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { color: '#FFF', marginTop: 10, fontSize: 16 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 5,
    fontSize: 16,
  },
  btn: {
    marginTop: 25,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  toggleText: { color: '#FFF', textAlign: 'center', marginTop: 20, fontSize: 15 },
});