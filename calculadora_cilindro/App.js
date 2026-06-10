import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [raio, setRaio] = useState('');
  const [altura, setAltura] = useState('');
  const [volume, setVolume] = useState('');

  const calcularVolume = () => {
    const resultado = Math.PI * Math.pow(Number(raio), 2) * Number(altura);
    setVolume(resultado.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Volume do Cilindro</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o raio"
        keyboardType="numeric"
        value={raio}
        onChangeText={setRaio}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite a altura"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <Button title="Calcular" onPress={calcularVolume} />

      <Text style={styles.resultado}>
        Volume: {volume}
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