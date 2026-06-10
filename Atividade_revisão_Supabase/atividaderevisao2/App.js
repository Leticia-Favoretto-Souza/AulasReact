import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'URL',
  'Key'
);

export default function MusicaApp() {
  const [musicas, setMusicas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [genero, setGenero] = useState('');

  async function carregarMusicas() {
    const { data, error } = await supabase.from('musica').select('*');
    if (error) {
      Alert.alert('Erro', error.message);
      return;
    }
    setMusicas(data || []);
  }

  async function cadastrarMusica() {
    if (!titulo.trim() || !artista.trim() || !genero.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos da música');
      return;
    }

    const { error } = await supabase.from('musica').insert([
      { titulo, artista, genero }
    ]);

    if (error) {
      Alert.alert('Erro', error.message);
      return;
    }

    Alert.alert('Sucesso', 'Música adicionada à sua playlist!');
    setTitulo(''); setArtista(''); setGenero('');
    carregarMusicas();
  }

  async function excluirMusica(id) {
    const { error } = await supabase.from('musica').delete().eq('id', id);
    if (error) {
      Alert.alert('Erro', error.message);
      return;
    }
    carregarMusicas();
  }

  useEffect(() => {
    carregarMusicas();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>🎵 Meu SpotFatec</Text>
      <Text style={styles.subtitulo}>Nova Música</Text>

      <TextInput style={styles.input} placeholder="Título da Música (ex: Eres)" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="Artista/Banda (ex: Café Tacvba)" value={artista} onChangeText={setArtista} />
      <TextInput style={styles.input} placeholder="Gênero (ex: Rock Alternativo)" value={genero} onChangeText={setGenero} />

      <Button title="Salvar Música" color="#9b59b6" onPress={cadastrarMusica} />

      <Text style={styles.subtitulo}>Minhas Músicas</Text>

      {musicas.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.musicaTitulo}>{item.titulo}</Text>
          <Text style={styles.musicaArtista}>Por: {item.artista}</Text>
          <Text style={styles.musicaGenero}>Gênero: {item.genero}</Text>
          <View style={{ marginTop: 8 }}>
            <Button title="Remover" color="#e74c3c" onPress={() => excluirMusica(item.id)} />
          </View>
        </View>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40, backgroundColor: '#fcfcfc' },
  titulo: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#9b59b6', marginBottom: 15 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginVertical: 12, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#fff' },
  card: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 12, marginBottom: 10, backgroundColor: '#fff', elevation: 1 },
  musicaTitulo: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  musicaArtista: { fontSize: 14, color: '#7f8c8d' },
  musicaGenero: { fontSize: 12, fontStyle: 'italic', color: '#95a5a6', marginTop: 2 },
});