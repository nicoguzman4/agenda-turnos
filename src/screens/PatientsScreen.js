// src/screens/PatientsScreen.js
import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setPatients } from '../store/patientsSlice';
import { setTurns } from '../store/turnsSlice';
import { getPatients, insertPatient, deletePatient, deleteTurnsByPatient, getTurns} from '../database/sqlite';
import { useFocusEffect } from '@react-navigation/native';

import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';


export default function PatientsScreen() {
  const dispatch = useDispatch();
  const patients = useSelector(state => state.patients);

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dni, setDni] = useState('');

  const loadPatients = () => {
    const data = getPatients();
    dispatch(setPatients(data));
  };

  const loadTurns = () => {
    const data = getTurns();
    dispatch(setTurns(data));
  };

useFocusEffect(
  React.useCallback(() => {
    loadPatients();
    loadTurns();
  }, [])
);

  const handleAdd = () => {
    if (!name || !lastname || !dni) {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    const newPatient = { name, lastname, dni };
    insertPatient(newPatient);

    loadPatients();

    setName('');
    setLastname('');
    setDni('');
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Eliminar paciente',
      'Se eliminará también todos sus turnos. ¿Continuar?',
      [
        { text: 'Cancelar' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteTurnsByPatient(id);
            deletePatient(id);

            loadPatients();
            loadTurns(); // 🔥 actualiza agenda en vivo
          }
        }
      ]
    );
  };

  return (

    
    <View style={styles.container}>
      <Text style={styles.title}>Pacientes</Text>
      

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={name}
        onChangeText={setName}
        borderWidth={1}
      />

      <TextInput
        placeholder="Apellido"
        style={styles.input}
        value={lastname}
        onChangeText={setLastname}
        borderWidth={1}
      />

      <TextInput
        placeholder="DNI"
        style={styles.input}
        value={dni}
        onChangeText={setDni}
        keyboardType="numeric"
        borderWidth={1}
      />

      <Button title="Agregar paciente" color="green" onPress={handleAdd} />
      <Button
  title="Cerrar sesión" color="red"  onPress={() => signOut(auth)} />

      <FlatList
        data={patients}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.lastname}, {item.name} - {item.dni}</Text>
            <Button title="X" color="red" onPress={() => handleDelete(item.id)} />
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
  item: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderWidth: 10,
  borderColor: '#918282',
  padding: 10,
  marginBottom: 10,
  borderRadius: 5
}

});
