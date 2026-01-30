import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { insertTurn } from '../database/sqlite';


export default function NewTurnScreen() {
  const patients = useSelector(state => state.patients);

  const [patientId, setPatientId] = useState(null);
  const [day, setDay] = useState('Lunes');
  const [hour, setHour] = useState('');
  const [place, setPlace] = useState('Hospital');

  const [showPatients, setShowPatients] = useState(false);
  const [showDays, setShowDays] = useState(false);
  const [showPlaces, setShowPlaces] = useState(false);

  useEffect(() => {
    if (patients.length > 0) {
      setPatientId(patients[0].id);
    }
  }, [patients]);

  const selectedPatient = patients.find(p => p.id === patientId);

  const saveTurn = () => {
  if (!patientId || !hour) {
    Alert.alert('Error', 'Complete todos los campos');
    return;
  }

  insertTurn({
    patientId,
    day,
    hour,
    place
  });

  Alert.alert('Turno guardado ');
  setHour('');
};


  if (patients.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Turno</Text>
        <Text>No hay pacientes cargados</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nuevo Turno</Text>

      {/* PACIENTE */}
      <Text style={styles.label}>Paciente</Text>
      <Pressable style={styles.select} onPress={() => setShowPatients(!showPatients)}>
        <Text>
          {selectedPatient?.lastname}, {selectedPatient?.name}
        </Text>
      </Pressable>

      {showPatients && patients.map(p => (
        <Pressable
          key={p.id}
          style={styles.option}
          onPress={() => {
            setPatientId(p.id);
            setShowPatients(false);
          }}
        >
          <Text>{p.lastname}, {p.name}</Text>
        </Pressable>
      ))}

      {/* DIA */}
      <Text style={styles.label}>Día</Text>
      <Pressable style={styles.select} onPress={() => setShowDays(!showDays)}>
        <Text>{day}</Text>
      </Pressable>

      {showDays && ['Lunes','Martes','Miércoles','Jueves','Viernes'].map(d => (
        <Pressable
          key={d}
          style={styles.option}
          onPress={() => {
            setDay(d);
            setShowDays(false);
          }}
        >
          <Text>{d}</Text>
        </Pressable>
      ))}

      {/* HORA */}
      <Text style={styles.label}>Hora</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 14:30"
        value={hour}
        onChangeText={setHour}
      />

      {/* SEDE */}
      <Text style={styles.label}>Sede</Text>
      <Pressable style={styles.select} onPress={() => setShowPlaces(!showPlaces)}>
        <Text>{place}</Text>
      </Pressable>

      {showPlaces && ['Hospital','Privado'].map(s => (
        <Pressable
          key={s}
          style={styles.option}
          onPress={() => {
            setPlace(s);
            setShowPlaces(false);
          }}
        >
          <Text>{s}</Text>
        </Pressable>
      ))}

      <Button title="Guardar turno" onPress={saveTurn} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#0f0f0f',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  select: {
    borderWidth: 1,
    borderColor: '#080808',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#aa9c9c'
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    backgroundColor: '#c4bdbd'
  }
});
