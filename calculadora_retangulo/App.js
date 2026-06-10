import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [ladoA, setLadoA] = useState('');
  const [ladoB, setLadoB] = useState('');
  const [area, setArea] = useState('');

  const calcularArea = () => {
    const resultado = Number(ladoA) * Number(ladoB);
    setArea(resultado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Área do Retângulo</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o Lado A"
        keyboardType="numeric"
        value={ladoA}
        onChangeText={setLadoA}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite o Lado B"
        keyboardType="numeric"
        value={ladoB}
        onChangeText={setLadoB}
      />

      <Button title="Calcular" onPress={calcularArea} />

      <Text style={styles.resultado}>
        Área: {area}
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