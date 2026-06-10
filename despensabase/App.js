import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet
} from "react-native";

const URL_DESPENSA = "https://Nome-Projeto.supabase.co/rest/v1/despensa";
const URL_ESTOQUE = "https://Nome-Projeto.supabase.co/rest/v1/estoque";
const API_KEY = "ANON_KEY";

export default function App() {
  const [form, setForm] = useState({
    nome_item: "",
    data_validade: "",
    peso: "",
    qtde_pacote: "",
    marca: "",
    status: "",
    obs: ""
  });

  const [despensa, setDespensa] = useState([]);
  const [estoque, setEstoque] = useState([]);

  const atualizarCampo = (campo, valor) => {
    setForm({
      ...form,
      [campo]: valor
    });
  };

  const headers = {
    "Content-Type": "application/json",
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`
  };

  const carregar = async () => {
    try {
      const resDespensa = await fetch(URL_DESPENSA, {
        headers
      });

      const resEstoque = await fetch(URL_ESTOQUE, {
        headers
      });

      const dadosDespensa = await resDespensa.json();
      const dadosEstoque = await resEstoque.json();

      setDespensa(dadosDespensa);
      setEstoque(dadosEstoque);
    } catch (erro) {
      console.log("Erro ao carregar dados:", erro);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async () => {
    if (!form.nome_item || !form.qtde_pacote) {
      alert("Preencha pelo menos o nome do item e a quantidade.");
      return;
    }

    try {
      await fetch(URL_DESPENSA, {
        method: "POST",
        headers,
        body: JSON.stringify({
          nome_item: form.nome_item,
          data_validade: form.data_validade,
          peso: form.peso,
          qtde_pacote: parseInt(form.qtde_pacote),
          marca: form.marca,
          status: form.status,
          obs: form.obs
        })
      });

      await fetch(URL_ESTOQUE, {
        method: "POST",
        headers,
        body: JSON.stringify({
          nome_item: form.nome_item,
          quantidade_total: parseInt(form.qtde_pacote),
          ultima_atualizacao: new Date().toISOString()
        })
      });

      setForm({
        nome_item: "",
        data_validade: "",
        peso: "",
        qtde_pacote: "",
        marca: "",
        status: "",
        obs: ""
      });

      carregar();
      alert("Item salvo com sucesso!");
    } catch (erro) {
      console.log("Erro ao salvar:", erro);
      alert("Erro ao salvar item.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Controle de Estoque</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do item"
        value={form.nome_item}
        onChangeText={(valor) => atualizarCampo("nome_item", valor)}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de validade"
        value={form.data_validade}
        onChangeText={(valor) => atualizarCampo("data_validade", valor)}
      />

      <TextInput
        style={styles.input}
        placeholder="Peso"
        value={form.peso}
        onChangeText={(valor) => atualizarCampo("peso", valor)}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade de pacotes"
        keyboardType="numeric"
        value={form.qtde_pacote}
        onChangeText={(valor) => atualizarCampo("qtde_pacote", valor)}
      />

      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={form.marca}
        onChangeText={(valor) => atualizarCampo("marca", valor)}
      />

      <TextInput
        style={styles.input}
        placeholder="Status"
        value={form.status}
        onChangeText={(valor) => atualizarCampo("status", valor)}
      />

      <TextInput
        style={styles.input}
        placeholder="Observação"
        value={form.obs}
        onChangeText={(valor) => atualizarCampo("obs", valor)}
      />

      <Button title="Salvar" onPress={salvar} />

      <Text style={styles.subtitulo}>Itens da Despensa</Text>

      {despensa.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>Nome: {item.nome_item}</Text>
          <Text>Marca: {item.marca}</Text>
          <Text>Quantidade: {item.qtde_pacote}</Text>
          <Text>Validade: {item.data_validade}</Text>
          <Text>Status: {item.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
});