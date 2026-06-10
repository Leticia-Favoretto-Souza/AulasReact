import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [tensao, setTensao] = useState('');
  const [corrente, setCorrente] = useState('');
  const [resistencia, setResistencia] = useState('');

  const calcularResistencia = () => {
    const resultado = Number(tensao) / Number(corrente);
    setResistencia(resultado.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de Resistência Elétrica</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a tensão (V)"
        keyboardType="numeric"
        value={tensao}
        onChangeText={setTensao}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite a corrente (A)"
        keyboardType="numeric"
        value={corrente}
        onChangeText={setCorrente}
      />

      <Button
        title="Calcular"
        onPress={calcularResistencia}
      />

      <Text style={styles.resultado}>
        Resistência: {resistencia} Ω
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  resultado: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
  },
});