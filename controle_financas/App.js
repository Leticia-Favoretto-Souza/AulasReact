import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

const URL = "https://Nome-Projeto.supabase.co/rest/v1/financas";
const API_KEY = "ANON_KEY";

export default function App() {
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    tipo: "",
    data: "",
    categoria: "",
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
    if (!form.descricao || !form.valor) {
      alert("Preencha descrição e valor.");
      return;
    }

    await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...form,
        valor: parseFloat(form.valor)
      })
    });

    setForm({
      descricao: "",
      valor: "",
      tipo: "",
      data: "",
      categoria: "",
      obs: ""
    });

    carregar();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Controle Financeiro</Text>

      <TextInput style={styles.input} placeholder="Descrição" value={form.descricao} onChangeText={(v) => atualizarCampo("descricao", v)} />
      <TextInput style={styles.input} placeholder="Valor" keyboardType="numeric" value={form.valor} onChangeText={(v) => atualizarCampo("valor", v)} />
      <TextInput style={styles.input} placeholder="Tipo: entrada ou saída" value={form.tipo} onChangeText={(v) => atualizarCampo("tipo", v)} />
      <TextInput style={styles.input} placeholder="Data" value={form.data} onChangeText={(v) => atualizarCampo("data", v)} />
      <TextInput style={styles.input} placeholder="Categoria" value={form.categoria} onChangeText={(v) => atualizarCampo("categoria", v)} />
      <TextInput style={styles.input} placeholder="Observação" value={form.obs} onChangeText={(v) => atualizarCampo("obs", v)} />

      <Button title="Salvar" onPress={salvar} />

      <Text style={styles.subtitulo}>Lançamentos</Text>

      {lista.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>Descrição: {item.descricao}</Text>
          <Text>Valor: R$ {item.valor}</Text>
          <Text>Tipo: {item.tipo}</Text>
          <Text>Data: {item.data}</Text>
          <Text>Categoria: {item.categoria}</Text>
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