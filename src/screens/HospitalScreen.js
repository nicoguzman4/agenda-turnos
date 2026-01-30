import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';

export default function HospitalScreen() {
  const turns = useSelector(state => state.turns);
  const patients = useSelector(state => state.patients);

  const hospitalTurns = turns.filter(t => t.place === 'Hospital');

  const [dayFilter, setDayFilter] = useState('Todos');
  const [showDays, setShowDays] = useState(false);

  const getPatientName = (id) => {
    const p = patients.find(p => p.id === id);
    return p ? `${p.lastname}, ${p.name}` : 'Paciente eliminado';
  };

  const filteredTurns =
    dayFilter === 'Todos'
      ? hospitalTurns
      : hospitalTurns.filter(t => t.day === dayFilter);

  if (filteredTurns.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hospital</Text>

        <Text style={styles.label}>Filtrar por día</Text>
        <Pressable style={styles.select} onPress={() => setShowDays(!showDays)}>
          <Text>{dayFilter}</Text>
        </Pressable>

        {showDays && ['Todos','Lunes','Martes','Miércoles','Jueves','Viernes'].map(d => (
          <Pressable
            key={d}
            style={styles.option}
            onPress={() => {
              setDayFilter(d);
              setShowDays(false);
            }}
          >
            <Text>{d}</Text>
          </Pressable>
        ))}

        <Text>No hay turnos en Hospital</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Turnos Hospital</Text>

      {/* FILTRO */}
      <Text style={styles.label}>Filtrar por día</Text>
      <Pressable style={styles.select} onPress={() => setShowDays(!showDays)}>
        <Text>{dayFilter}</Text>
      </Pressable>

      {showDays && ['Todos','Lunes','Martes','Miércoles','Jueves','Viernes'].map(d => (
        <Pressable
          key={d}
          style={styles.option}
          onPress={() => {
            setDayFilter(d);
            setShowDays(false);
          }}
        >
          <Text>{d}</Text>
        </Pressable>
      ))}

      <FlatList
        data={filteredTurns}
        keyExtractor={item => item.id.toString()}
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
  label: { fontWeight:'bold', marginTop:10 },
  select: {
    borderWidth:1,
    borderColor:'#080808',
    padding:10,
    borderRadius:5,
    backgroundColor:'#aa9c9c',
    marginBottom:5
  },
  option: {
    padding:10,
    borderWidth:1,
    borderColor:'#ccc',
    marginBottom:5,
    backgroundColor:'#c4bdbd'
  },
  item: { borderWidth:1, padding:10, marginBottom:10, borderRadius:5 }
});
