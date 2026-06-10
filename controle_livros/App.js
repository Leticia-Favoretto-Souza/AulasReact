import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

const URL = "https://Nome-Projeto.supabase.co/rest/v1/livros";
const API_KEY = "ANON_KEY";

export default function App() {
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    genero: "",
    status: "",
    nota: "",
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
    if (!form.titulo) {
      alert("Preencha o título do livro.");
      return;
    }

    await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...form,
        nota: parseFloat(form.nota)
      })
    });

    setForm({
      titulo: "",
      autor: "",
      genero: "",
      status: "",
      nota: "",
      obs: ""
    });

    carregar();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Controle de Livros</Text>

      <TextInput style={styles.input} placeholder="Título" value={form.titulo} onChangeText={(v) => atualizarCampo("titulo", v)} />
      <TextInput style={styles.input} placeholder="Autor" value={form.autor} onChangeText={(v) => atualizarCampo("autor", v)} />
      <TextInput style={styles.input} placeholder="Gênero" value={form.genero} onChangeText={(v) => atualizarCampo("genero", v)} />
      <TextInput style={styles.input} placeholder="Status de leitura" value={form.status} onChangeText={(v) => atualizarCampo("status", v)} />
      <TextInput style={styles.input} placeholder="Nota" keyboardType="numeric" value={form.nota} onChangeText={(v) => atualizarCampo("nota", v)} />
      <TextInput style={styles.input} placeholder="Observação" value={form.obs} onChangeText={(v) => atualizarCampo("obs", v)} />

      <Button title="Salvar" onPress={salvar} />

      <Text style={styles.subtitulo}>Livros cadastrados</Text>

      {lista.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>Título: {item.titulo}</Text>
          <Text>Autor: {item.autor}</Text>
          <Text>Gênero: {item.genero}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Nota: {item.nota}</Text>
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