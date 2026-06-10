import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [fahrenheit, setFahrenheit] = useState('');
  const [celsius, setCelsius] = useState('');

  const converterTemperatura = () => {
    const resultado = (Number(fahrenheit) - 32) * 5 / 9;
    setCelsius(resultado.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Conversor de Fahrenheit para Celsius
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a temperatura em °F"
        keyboardType="numeric"
        value={fahrenheit}
        onChangeText={setFahrenheit}
      />

      <Button
        title="Converter"
        onPress={converterTemperatura}
      />

      <Text style={styles.resultado}>
        Temperatura em Celsius: {celsius} °C
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