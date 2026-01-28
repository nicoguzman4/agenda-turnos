import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTurns } from '../store/turnsSlice';
import { getTurns } from '../database/sqlite';

export default function AgendaScreen() {
  const dispatch = useDispatch();
  const turns = useSelector(state => state.turns);
  const patients = useSelector(state => state.patients);

  useEffect(() => {
    loadTurns();
  }, []);

  const loadTurns = async () => {
    try {
      const data = await getTurns();
      dispatch(setTurns(data));
    } catch (err) {
      console.log('Error cargando turnos:', err);
    }
  };

  const getPatientName = (id) => {
    const p = patients.find(p => p.id === id);
    return p ? `${p.lastname}, ${p.name}` : 'Paciente eliminado';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda</Text>

      <FlatList
        data={turns}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Paciente: {getPatientName(item.patientId)}</Text>
            <Text>Día: {item.day}</Text>
            <Text>Hora: {item.hour}</Text>
            <Text>Sede: {item.place}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:22, fontWeight:'bold', marginBottom:10 },
  item: { borderWidth:1, padding:10, marginBottom:10 }
});
