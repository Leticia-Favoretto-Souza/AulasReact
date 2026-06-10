/*
==================================================
COLINHA BÁSICA DE REACT / REACT NATIVE
==================================================

1. IMPORTAÇÕES BÁSICAS

import React, { useState, useEffect } from "react";

import {
  View,        // Caixa/container
  Text,        // Texto na tela
  TextInput,   // Campo de digitação
  Button,      // Botão simples
  ScrollView,  // Área com rolagem
  StyleSheet   // Estilos
} from "react-native";


==================================================
2. COMPONENTE PRINCIPAL
==================================================

export default function App() {
  return (
    <View>
      <Text>Olá mundo</Text>
    </View>
  );
}


==================================================
3. useState
==================================================

Serve para criar variáveis que mudam na tela.

const [nome, setNome] = useState("");

nome    -> valor atual
setNome -> função que altera o valor

Exemplo:

const [contador, setContador] = useState(0);

setContador(contador + 1);


==================================================
4. TextInput
==================================================

Campo onde o usuário digita.

<TextInput
  placeholder="Digite seu nome"
  value={nome}
  onChangeText={setNome}
/>


==================================================
5. Button
==================================================

<Button
  title="Salvar"
  onPress={salvar}
/>


==================================================
6. FUNÇÃO
==================================================

const salvar = () => {
  alert("Salvo com sucesso!");
};


==================================================
7. FORMULÁRIO COM VÁRIOS CAMPOS
==================================================

const [form, setForm] = useState({
  nome: "",
  idade: "",
  obs: ""
});

const atualizarCampo = (campo, valor) => {
  setForm({
    ...form,
    [campo]: valor
  });
};

<TextInput
  placeholder="Nome"
  value={form.nome}
  onChangeText={(valor) => atualizarCampo("nome", valor)}
/>


==================================================
8. LISTA COM map
==================================================

{lista.map((item, index) => (
  <Text key={index}>{item.nome}</Text>
))}


==================================================
9. useEffect
==================================================

Executa algo quando o app abre.

useEffect(() => {
  carregar();
}, []);


==================================================
10. fetch GET
==================================================

Buscar dados de uma API.

const carregar = async () => {
  const resposta = await fetch(URL, {
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`
    }
  });

  const dados = await resposta.json();
  setLista(dados);
};


==================================================
11. fetch POST
==================================================

Enviar dados para uma API.

const salvar = async () => {
  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      nome: form.nome,
      quantidade: parseInt(form.quantidade)
    })
  });
};


==================================================
12. CONVERSÕES IMPORTANTES
==================================================

parseInt(valor)    -> transforma em número inteiro
parseFloat(valor)  -> transforma em número decimal
Number(valor)      -> transforma em número

Exemplo:
const idade = parseInt(form.idade);
const preco = parseFloat(form.preco);


==================================================
13. StyleSheet
==================================================

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
});


==================================================
14. ESTRUTURA PADRÃO DE UM APP COM SUPABASE
==================================================

1. Criar estados
2. Criar URL da tabela
3. Criar API_KEY
4. Criar função carregar()
5. Usar useEffect para carregar ao abrir
6. Criar função salvar()
7. Criar inputs
8. Criar botão
9. Listar os dados com map()


==================================================
*/