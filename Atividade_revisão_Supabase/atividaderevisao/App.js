import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  ADICIONAR PROJECT URL,
  ADICIONAR PUBLISHABLE KEY'
);

export default function App() {
  const [aba, setAba] = useState('produtos'); // 'produtos' ou 'clientes'

  // --- ESTADOS DE PRODUTOS ---
  const [produtos, setProdutos] = useState([]);
  const [nomeProd, setNomeProd] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');

  // --- ESTADOS DE CLIENTES ---
  const [clientes, setClientes] = useState([]);
  const [nomeCli, setNomeCli] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');

  // --- FUNÇÕES DE PRODUTOS ---
  async function carregarProdutos() {
    const { data, error } = await supabase.from('produto').select('*');
    if (error) { Alert.alert('Erro', error.message); return; }
    setProdutos(data || []);
  }

  async function cadastrarProduto() {
    if (!nomeProd.trim() || !descricao.trim() || !quantidade.trim() || !preco.trim() || !categoria.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos do produto');
      return;
    }
    const { error } = await supabase.from('produto').insert([
      { nome: nomeProd, descricao, quantidade: Number(quantidade), preco: Number(preco), categoria },
    ]);
    if (error) { Alert.alert('Erro', error.message); return; }
    Alert.alert('Sucesso', 'Produto cadastrado');
    setNomeProd(''); setDescricao(''); setQuantidade(''); setPreco(''); setCategoria('');
    carregarProdutos();
  }

  async function excluirProduto(id) {
    const { error } = await supabase.from('produto').delete().eq('id', id);
    if (error) { Alert.alert('Erro', error.message); return; }
    carregarProdutos();
  }

  // --- FUNÇÕES DE CLIENTES ---
  async function carregarClientes() {
    const { data, error } = await supabase.from('cliente').select('*');
    if (error) { Alert.alert('Erro', error.message); return; }
    setClientes(data || []);
  }

  async function cadastrarCliente() {
    if (!nomeCli.trim() || !email.trim() || !telefone.trim() || !cpf.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos do cliente');
      return;
    }
    const { error } = await supabase.from('cliente').insert([
      { nome: nomeCli, email, telefone, cpf },
    ]);
    if (error) { Alert.alert('Erro', error.message); return; }
    Alert.alert('Sucesso', 'Cliente cadastrado');
    setNomeCli(''); setEmail(''); setTelefone(''); setCpf('');
    carregarClientes();
  }

  async function excluirCliente(id) {
    const { error } = await supabase.from('cliente').delete().eq('id', id);
    if (error) { Alert.alert('Erro', error.message); return; }
    carregarClientes();
  }

  useEffect(() => {
    carregarProdutos();
    carregarClientes();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Trailer Fatec</Text>

      {/* Barra de Navegação entre Abas */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navButton, aba === 'produtos' && styles.navButtonAtivo]} 
          onPress={() => setAba('produtos')}
        >
          <Text style={[styles.navText, aba === 'produtos' && styles.navTextAtivo]}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButton, aba === 'clientes' && styles.navButtonAtivo]} 
          onPress={() => setAba('clientes')}
        >
          <Text style={[styles.navText, aba === 'clientes' && styles.navTextAtivo]}>Clientes</Text>
        </TouchableOpacity>
      </View>

      {/* --- TELA DE PRODUTOS --- */}
      {aba === 'produtos' && (
        <View>
          <Text style={styles.subtitulo}>Cadastro de Produto</Text>
          <TextInput style={styles.input} placeholder="Nome" value={nomeProd} onChangeText={setNomeProd} />
          <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
          <TextInput style={styles.input} placeholder="Quantidade" keyboardType="numeric" value={quantidade} onChangeText={setQuantidade} />
          <TextInput style={styles.input} placeholder="Preço" keyboardType="numeric" value={preco} onChangeText={setPreco} />
          <TextInput style={styles.input} placeholder="Categoria" value={categoria} onChangeText={setCategoria} />
          <Button title="Cadastrar Produto" color="#007bff" onPress={cadastrarProduto} />

          <Text style={styles.subtitulo}>Produtos Cadastrados</Text>
          {produtos.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitulo}>{item.nome}</Text>
              <Text>Descrição: {item.descricao}</Text>
              <Text>Quantidade: {item.quantidade} | Preço: R$ {item.preco}</Text>
              <Text style={styles.badge}>{item.categoria}</Text>
              <View style={{ marginTop: 10 }}>
                <Button title="Excluir" color="red" onPress={() => excluirProduto(item.id)} />
              </View>
            </View>
          ))}
        </View>
      )}

      {/* --- TELA DE CLIENTES --- */}
      {aba === 'clientes' && (
        <View>
          <Text style={styles.subtitulo}>Cadastro de Cliente</Text>
          <TextInput style={styles.input} placeholder="Nome Completo" value={nomeCli} onChangeText={setNomeCli} />
          <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Telefone" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />
          <TextInput style={styles.input} placeholder="CPF" keyboardType="numeric" value={cpf} onChangeText={setCpf} />
          <Button title="Cadastrar Cliente" color="#28a745" onPress={cadastrarCliente} />

          <Text style={styles.subtitulo}>Clientes Cadastrados</Text>
          {clientes.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitulo}>{item.nome}</Text>
              <Text>E-mail: {item.email}</Text>
              <Text>Telefone: {item.telefone}</Text>
              <Text>CPF: {item.cpf}</Text>
              <View style={{ marginTop: 10 }}>
                <Button title="Excluir" color="red" onPress={() => excluirCliente(item.id)} />
              </View>
            </View>
          ))}
        </View>
      )}
      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40, backgroundColor: '#fff' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subtitulo: { fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 10, backgroundColor: '#f9f9f9' },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  badge: { fontStyle: 'italic', color: '#666', marginTop: 4 },
  navBar: { flexDirection: 'row', marginBottom: 10, borderRadius: 8, backgroundColor: '#eee', padding: 4 },
  navButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  navButtonAtivo: { backgroundColor: '#fff', elevation: 2 },
  navText: { fontWeight: 'bold', color: '#666' },
  navTextAtivo: { color: '#000' }
});