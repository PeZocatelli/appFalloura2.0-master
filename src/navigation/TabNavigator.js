// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DadosAtuaisScreen from '../screens/dadosAtuais.js';
import DadosFixosScreen from '../screens/DadosFixos.js';
import LocalRealScreen from '../screens/LocalReal.js';
import ConfiguracoesScreen from '../screens/Configuracoes.js';

import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }} />
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: { paddingVertical: 5 },
      }}
    >
      {/* 🏠 Home */}
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={28} color={focused ? '#000' : '#444'} />
          ),
        }}
      />

      {/* ❤️ Dados Atuais */}
      <Tab.Screen
        name="DadosAtuais"
        component={DadosAtuaisScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={28}
              color={focused ? '#000' : '#444'}
            />
          ),
        }}
      />

      {/* 📋 Dados Fixos */}
      <Tab.Screen
        name="DadosFixos"
        component={DadosFixosScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'reader' : 'reader-outline'}
              size={28}
              color={focused ? '#000' : '#444'}
            />
          ),
        }}
      />

      {/* 🗺️ Mapa */}
      <Tab.Screen
        name="Mapa"
        component={LocalRealScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'map' : 'map-outline'}
              size={28}
              color={focused ? '#000' : '#444'}
            />
          ),
        }}
      />

      {/* ⚙️ Configurações */}
      <Tab.Screen
        name="Configuracoes"
        component={ConfiguracoesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={28}
              color={focused ? '#000' : '#444'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 25,
    borderTopWidth: 0,
    height: 65,
    elevation: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});