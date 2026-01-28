import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setPatients } from '../store/patientsSlice';
import { getPatients, insertPatient, deletePatient } from '../database/sqlite';

export default function PatientsScreen() {
  const dispatch = useDispatch();
  const patients = useSelector(state => state.patients);

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dni, setDni] = useState('');

  const loadPatients = async () => {
    const data = await getPatients();
    dispatch(setPatients(data));
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleAdd = async () => {
    if (!name || !lastname || !dni) {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    await insertPatient({ name, lastname, dni });
    await loadPatients();

    setName('');
    setLastname('');
    setDni('');
  };

  const handleDelete = async (id) => {
    await deletePatient(id);
    await loadPatients();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pacientes</Text>

      <TextInput placeholder="Nombre" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Apellido" style={styles.input} value={lastname} onChangeText={setLastname} />
      <TextInput placeholder="DNI" style={styles.input} value={dni} onChangeText={setDni} keyboardType="numeric" />

      <Button title="Agregar paciente" onPress={handleAdd} />

      <FlatList
        data={patients}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.lastname}, {item.name} - {item.dni}</Text>
            <Button title="X" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:22, fontWeight:'bold', marginBottom:10 },
  input: { borderWidth:1, padding:10, marginBottom:10 },
  item: { flexDirection:'row', justifyContent:'space-between', marginVertical:5 }
});
