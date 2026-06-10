import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

const URL = "https://Nome-Projeto.supabase.co/rest/v1/materiais";
const API_KEY = "ANON_KEY";

export default function App() {
  const [form, setForm] = useState({
    nome: "",
    quantidade: "",
    materia: "",
    status: "",
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
    if (!form.nome || !form.quantidade) {
      alert("Preencha nome e quantidade.");
      return;
    }

    await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...form,
        quantidade: parseInt(form.quantidade)
      })
    });

    setForm({
      nome: "",
      quantidade: "",
      materia: "",
      status: "",
      obs: ""
    });

    carregar();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Lista de Materiais Escolares</Text>

      <TextInput style={styles.input} placeholder="Nome do material" value={form.nome} onChangeText={(v) => atualizarCampo("nome", v)} />
      <TextInput style={styles.input} placeholder="Quantidade" keyboardType="numeric" value={form.quantidade} onChangeText={(v) => atualizarCampo("quantidade", v)} />
      <TextInput style={styles.input} placeholder="Matéria" value={form.materia} onChangeText={(v) => atualizarCampo("materia", v)} />
      <TextInput style={styles.input} placeholder="Status" value={form.status} onChangeText={(v) => atualizarCampo("status", v)} />
      <TextInput style={styles.input} placeholder="Observação" value={form.obs} onChangeText={(v) => atualizarCampo("obs", v)} />

      <Button title="Salvar" onPress={salvar} />

      <Text style={styles.subtitulo}>Materiais cadastrados</Text>

      {lista.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>Material: {item.nome}</Text>
          <Text>Quantidade: {item.quantidade}</Text>
          <Text>Matéria: {item.materia}</Text>
          <Text>Status: {item.status}</Text>
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