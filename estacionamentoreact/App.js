import React, { useState, useEffect } from "react";
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert
} from 'react-native';

const URL_ESTACIONAMENTO = "";
const API_KEY = "";

export default function App() {
  const [form, setForm] = useState({
    nome: "",
    placa: "",
    modelo: "",
    cor: "",
  });

  const [estacionamento, setEstacionamento] = useState([]);

  const carregar = async () => {
    if (!URL_ESTACIONAMENTO || !API_KEY) return;

    try {
      const headers = {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`
      };

      const [res] = await Promise.all([
        fetch(URL_ESTACIONAMENTO, { headers })
      ]);

      const dataEstacionamento = await res.json();
        setEstacionamento(Array.isArray(dataEstacionamento) ? dataEstacionamento : []);
          } catch (error) {
      console.error("erro ao carregar dados:", error);
    }
  };


  useEffect(() => {
    carregar();
  }, []);

  const salvar = async () => {
    if (!form.placa || !form.nome) {
      Alert.alert("Erro", "Nome do dono e Placa são obrigatórios.");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`
      };

      await fetch(URL_ESTACIONAMENTO, {
        method: "POST",
        headers,
        body: JSON.stringify({
          nome: form.nome,
          placa: form.placa,
          modelo: form.modelo,
          cor: form.cor
        })
      });

      setForm({
        nome: "",
        placa: "",
        modelo: "",
        cor: "",
      });

      carregar();
      Alert.alert("Sucesso", "Veículo registrado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível registrar o veículo.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Controle de Estacionamento</Text>

      {Object.keys(form).map((campo) => (
        <TextInput
          key={campo}
          placeholder={campo.toUpperCase()}
          value={form[campo]}
          onChangeText={(text) => setForm({ ...form, [campo]: text })}
          style={styles.input}
          autoCapitalize={campo === "placa" ? "characters" : "sentences"}
        />
      ))}

      <Button title="Registrar Entrada" onPress={salvar} color="#2ecc71" />

      <Text style={styles.subtitulo}>Veículos Pátio ({estacionamento.length})</Text>
      
      {estacionamento && estacionamento.map((veiculo, index) => (
        <View key={index} style={styles.itemBox}>
          <Text style={styles.itemTextoPrincipal}>
            🚗 {veiculo.modelo} ({veiculo.cor})
          </Text>
          <Text style={styles.itemTextoSecundario}>
            Placa: {veiculo.placa} | Dono: {veiculo.nome}
          </Text>
        </View>
      ))}
      
      <View style={{ height: 50 }} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50'
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    color: '#34495e'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fafafa'
  },
  itemBox: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    marginBottom: 5
  },
  itemTextoPrincipal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748'
  },
  itemTextoSecundario: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2
  }
});