import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { addTask } from './helper/Task';

interface Props {
  navigation: StackNavigationProp<any>;
}

const marginScreen = 10;


export default function AddTask (props: Props) {
  
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState('');
  const [nomeTarefa, setNomeTarefa] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    let dd = Number(date.getDate())
    let mm = Number(date.getMonth()) //January is 0!
    let yyyy = date.getFullYear();
    setDateString(dd + '/' + (mm + 1) + '/' + yyyy);
  }, [date]);

  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  async function salvarTarefa() {
    await addTask({
      nome: nomeTarefa,
      data_execucao: date
    }).then(res => ToastAndroid.show(res, ToastAndroid.LONG)).then(() => props.navigation.replace('Main'));
    
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header arrow back and title */}
        <View style={{ width: '100%', height: 60,}}>
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ fontSize: 20 }}>Adicionar Tarefa</Text>
          </View>
        </View>
        {/* Formulario */}
        <View>
          <View>
            <TextInput 
              style={{ width: '100%', height: 60, padding: 10, borderColor: '#CCC', borderRadius: 8, borderWidth: 1, fontSize: 16 }}
              placeholder={'Nome Evento'}
              onChangeText={text => setNomeTarefa(text)}
            />
          </View>
          <View>
          <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Data: </Text>
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={{ fontSize: 16 }}>{ dateString }</Text>
            </TouchableOpacity>
          </View>
          { show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          </View>
        </View>
      </View>
      <View style={{width: '100%', position: 'absolute', bottom: 10, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'  }}>
          <View style={{ width: '48%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '48%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => salvarTarefa()}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: marginScreen,
    paddingRight: marginScreen,
    backgroundColor: '#fff',
  },
});