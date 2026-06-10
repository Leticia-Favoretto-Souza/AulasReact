import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

const URL = "https://Nome-Projeto.supabase.co/rest/v1/pets";
const API_KEY = "ANON_KEY";

export default function App() {
  const [form, setForm] = useState({
    nome: "",
    especie: "",
    idade: "",
    peso: "",
    vacina: "",
    obs: ""
  });

  const [lista, setLista] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`
  };

  const atualizarCampo = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

  const carregar = async () => {
    const res = await fetch(URL, { headers });
    const dados = await res.json();
    setLista(dados);
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async () => {
    if (!form.nome) {
      alert("Preencha o nome do pet.");
      return;
    }

    await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...form,
        idade: parseInt(form.idade),
        peso: parseFloat(form.peso)
      })
    });

    setForm({
      nome: "",
      especie: "",
      idade: "",
      peso: "",
      vacina: "",
      obs: ""
    });

    carregar();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Pets</Text>

      <TextInput style={styles.input} placeholder="Nome do pet" value={form.nome} onChangeText={(v) => atualizarCampo("nome", v)} />
      <TextInput style={styles.input} placeholder="Espécie" value={form.especie} onChangeText={(v) => atualizarCampo("especie", v)} />
      <TextInput style={styles.input} placeholder="Idade" keyboardType="numeric" value={form.idade} onChangeText={(v) => atualizarCampo("idade", v)} />
      <TextInput style={styles.input} placeholder="Peso" keyboardType="numeric" value={form.peso} onChangeText={(v) => atualizarCampo("peso", v)} />
      <TextInput style={styles.input} placeholder="Vacina" value={form.vacina} onChangeText={(v) => atualizarCampo("vacina", v)} />
      <TextInput style={styles.input} placeholder="Observação" value={form.obs} onChangeText={(v) => atualizarCampo("obs", v)} />

      <Button title="Salvar" onPress={salvar} />

      <Text style={styles.subtitulo}>Pets cadastrados</Text>

      {lista.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>Nome: {item.nome}</Text>
          <Text>Espécie: {item.especie}</Text>
          <Text>Idade: {item.idade}</Text>
          <Text>Peso: {item.peso}</Text>
          <Text>Vacina: {item.vacina}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50 },
  titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  subtitulo: { fontSize: 20, fontWeight: "bold", marginTop: 30, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#999", padding: 10, marginBottom: 10, borderRadius: 5 },
  card: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 }
});