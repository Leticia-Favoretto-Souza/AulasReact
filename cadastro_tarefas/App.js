import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

const URL = "https://Nome-Projeto.supabase.co/rest/v1/tarefas";
const API_KEY = "ANON_KEY";

export default function App() {
  const [form, setForm] = useState({
    titulo: "",
    prazo: "",
    prioridade: "",
    status: "",
    responsavel: "",
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
      alert("Preencha o título da tarefa.");
      return;
    }

    await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(form)
    });

    setForm({
      titulo: "",
      prazo: "",
      prioridade: "",
      status: "",
      responsavel: "",
      obs: ""
    });

    carregar();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Tarefas</Text>

      <TextInput style={styles.input} placeholder="Título da tarefa" value={form.titulo} onChangeText={(v) => atualizarCampo("titulo", v)} />
      <TextInput style={styles.input} placeholder="Prazo" value={form.prazo} onChangeText={(v) => atualizarCampo("prazo", v)} />
      <TextInput style={styles.input} placeholder="Prioridade" value={form.prioridade} onChangeText={(v) => atualizarCampo("prioridade", v)} />
      <TextInput style={styles.input} placeholder="Status" value={form.status} onChangeText={(v) => atualizarCampo("status", v)} />
      <TextInput style={styles.input} placeholder="Responsável" value={form.responsavel} onChangeText={(v) => atualizarCampo("responsavel", v)} />
      <TextInput style={styles.input} placeholder="Observação" value={form.obs} onChangeText={(v) => atualizarCampo("obs", v)} />

      <Button title="Salvar" onPress={salvar} />

      <Text style={styles.subtitulo}>Tarefas cadastradas</Text>

      {lista.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>Tarefa: {item.titulo}</Text>
          <Text>Prazo: {item.prazo}</Text>
          <Text>Prioridade: {item.prioridade}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Responsável: {item.responsavel}</Text>
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