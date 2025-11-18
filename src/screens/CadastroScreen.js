import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Alert
} from 'react-native';
import { supabase } from '../screens/conexao';

let LinearGradient;
try {
  ({ LinearGradient } = require('expo-linear-gradient'));
} catch {
  LinearGradient = ({ children, style, colors }) => (
    <View style={[style, { backgroundColor: colors ? colors[0] : '#4361EE' }]}>{children}</View>
  );
}

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [problema, setProblema] = useState('');
  const [idade, setIdade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleCadastro() {
    if (!email.trim() || !senha.trim() || !nome.trim() || !problema.trim() || !idade.trim() || !endereco.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha.trim(),
        options: {
          data: {
            nome: nome.trim(),
            problema: problema.trim(),
            idade: Number(idade),
            endereco: endereco.trim(),
          }
        }
      });

      if (error) {
        Alert.alert('Erro', error.message);
        return;
      }

      Alert.alert('Sucesso!', 'Cadastro realizado. Agora faça login.');
      navigation.navigate('Login');

    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao conectar ao servidor.');
    }
  }

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.bg}>
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />

        <View style={styles.form}>
          <Text style={styles.title}>Criar Conta</Text>

          <Text style={styles.label}>Nome:</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>Problema:</Text>
          <TextInput style={styles.input} value={problema} onChangeText={setProblema} />

          <Text style={styles.label}>Idade:</Text>
          <TextInput style={styles.input} value={idade} onChangeText={setIdade} keyboardType="numeric" />

          <Text style={styles.label}>Endereço:</Text>
          <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />

          <TouchableOpacity onPress={handleCadastro}>
            <LinearGradient colors={['#00CFFF', '#4361EE']} style={styles.btn}>
              <Text style={styles.btnText}>CADASTRAR</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.toggleText}>Já tem conta? Fazer Login</Text>
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
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  toggleText: { color: '#FFF', textAlign: 'center', marginTop: 20, fontSize: 15 },
});
