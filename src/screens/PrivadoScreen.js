import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function PrivadoScreen() {
  const turns = useSelector(state => state.turns);
  const patients = useSelector(state => state.patients);

  const privateTurns = turns.filter(t => t.place === 'Privado');

  const getPatientName = (id) => {
    const p = patients.find(p => p.id === id);
    return p ? `${p.lastname}, ${p.name}` : 'Paciente eliminado';
  };

  if (privateTurns.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Privado</Text>
        <Text>No hay turnos privados</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Turnos Privados</Text>

      <FlatList
        data={privateTurns}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Paciente: {getPatientName(item.patientId)}</Text>
            <Text>Día: {item.day}</Text>
            <Text>Hora: {item.hour}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:22, fontWeight:'bold', marginBottom:10 },
  item: { borderWidth:1, padding:10, marginBottom:10, borderRadius:5 }
});
