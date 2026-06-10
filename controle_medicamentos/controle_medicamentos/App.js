import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

const URL = "https://Nome-Projeto.supabase.co/rest/v1/medicamentos";
const API_KEY = "ANON_KEY";

export default function App() {
  const [form, setForm] = useState({
    nome: "",
    dose: "",
    horario: "",
    quantidade: "",
    validade: "",
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
      dose: "",
      horario: "",
      quantidade: "",
      validade: "",
      obs: ""
    });

    carregar();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Controle de Medicamentos</Text>

      <TextInput style={styles.input} placeholder="Nome do remédio" value={form.nome} onChangeText={(v) => atualizarCampo("nome", v)} />
      <TextInput style={styles.input} placeholder="Dose" value={form.dose} onChangeText={(v) => atualizarCampo("dose", v)} />
      <TextInput style={styles.input} placeholder="Horário" value={form.horario} onChangeText={(v) => atualizarCampo("horario", v)} />
      <TextInput style={styles.input} placeholder="Quantidade" keyboardType="numeric" value={form.quantidade} onChangeText={(v) => atualizarCampo("quantidade", v)} />
      <TextInput style={styles.input} placeholder="Validade" value={form.validade} onChangeText={(v) => atualizarCampo("validade", v)} />
      <TextInput style={styles.input} placeholder="Observação" value={form.obs} onChangeText={(v) => atualizarCampo("obs", v)} />

      <Button title="Salvar" onPress={salvar} />

      <Text style={styles.subtitulo}>Medicamentos cadastrados</Text>

      {lista.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>Nome: {item.nome}</Text>
          <Text>Dose: {item.dose}</Text>
          <Text>Horário: {item.horario}</Text>
          <Text>Quantidade: {item.quantidade}</Text>
          <Text>Validade: {item.validade}</Text>
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