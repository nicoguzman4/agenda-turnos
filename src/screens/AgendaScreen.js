import React, { useState } from 'react'; 
import { View, Text, FlatList, StyleSheet, Button, Alert, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTurns } from '../store/turnsSlice';
import { getTurns, deleteTurn } from '../database/sqlite';
import { useFocusEffect } from '@react-navigation/native';

export default function AgendaScreen() {
  const dispatch = useDispatch();
  const turns = useSelector(state => state.turns);
  const patients = useSelector(state => state.patients);

  const [dayFilter, setDayFilter] = useState('Todos');
  const [showDays, setShowDays] = useState(false);

  const loadTurns = () => {
    const data = getTurns();
    dispatch(setTurns(data));
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTurns();
    }, [])
  );

  const getPatientName = (id) => {
    const p = patients.find(p => p.id === id);
    return p ? `${p.lastname}, ${p.name}` : 'Paciente eliminado';
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Eliminar turno',
      '¿Seguro que querés eliminar este turno?',
      [
        { text: 'Cancelar' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteTurn(id);
            loadTurns();
          }
        }
      ]
    );
  };

  const filteredTurns =
    dayFilter === 'Todos'
      ? turns
      : turns.filter(t => t.day === dayFilter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda</Text>

      {/* FILTRO POR DIA */}
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
            <View style={{ flex: 1 }}>
              <Text>Paciente: {getPatientName(item.patientId)}</Text>
              <Text>Día: {item.day}</Text>
              <Text>Hora: {item.hour}</Text>
              <Text>Sede: {item.place}</Text>
            </View>

            <Button 
              title="X" 
              color="red"
              onPress={() => handleDelete(item.id)} 
            />
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
  item: {
    flexDirection:'row',
    justifyContent:'space-between',
    borderWidth:1,
    padding:10,
    marginBottom:10,
    borderRadius:5
  }
});
