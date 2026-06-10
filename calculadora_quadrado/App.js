import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [lado, setLado] = useState('');
  const [area, setArea] = useState('');

  const calcularArea = () => {
    const resultado = Number(lado) * Number(lado);
    setArea(resultado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de Área do Quadrado</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o lado do quadrado"
        keyboardType="numeric"
        value={lado}
        onChangeText={setLado}
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
    marginBottom: 20,
    textAlign: 'center',
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