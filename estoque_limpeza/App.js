import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

const URL = "https://Nome-Projeto.supabase.co/rest/v1/produtos_limpeza";
const API_KEY = "ANON_KEY";

export default function App() {
  const [form, setForm] = useState({
    produto: "",
    marca: "",
    quantidade: "",
    validade: "",
    local: "",
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
    if (!form.produto || !form.quantidade) {
      alert("Preencha produto e quantidade.");
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
      produto: "",
      marca: "",
      quantidade: "",
      validade: "",
      local: "",
      obs: ""
    });

    carregar();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Produtos de Limpeza</Text>

      <TextInput style={styles.input} placeholder="Produto" value={form.produto} onChangeText={(v) => atualizarCampo("produto", v)} />
      <TextInput style={styles.input} placeholder="Marca" value={form.marca} onChangeText={(v) => atualizarCampo("marca", v)} />
      <TextInput style={styles.input} placeholder="Quantidade" keyboardType="numeric" value={form.quantidade} onChangeText={(v) => atualizarCampo("quantidade", v)} />
      <TextInput style={styles.input} placeholder="Validade" value={form.validade} onChangeText={(v) => atualizarCampo("validade", v)} />
      <TextInput style={styles.input} placeholder="Local de armazenamento" value={form.local} onChangeText={(v) => atualizarCampo("local", v)} />
      <TextInput style={styles.input} placeholder="Observação" value={form.obs} onChangeText={(v) => atualizarCampo("obs", v)} />

      <Button title="Salvar" onPress={salvar} />

      <Text style={styles.subtitulo}>Produtos cadastrados</Text>

      {lista.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>Produto: {item.produto}</Text>
          <Text>Marca: {item.marca}</Text>
          <Text>Quantidade: {item.quantidade}</Text>
          <Text>Validade: {item.validade}</Text>
          <Text>Local: {item.local}</Text>
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