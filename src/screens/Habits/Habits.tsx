import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, TextInput, ToastAndroid } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';

import Adicionador from './Adicionador';

import { getAllData } from './helper/Habite';

import { FontAwesome5 } from '@expo/vector-icons';

interface IData<Object> {
  dia: number;
  mes: number;
  ano: number;
}


interface IHabitos<Object> {
  id?: Number;
  nome: string;
  frequencia: any;
  horario?: string;
  data_criacao?: IData<Object>;
}

const marginScreen = ((Dimensions.get('screen').width - (Dimensions.get('screen').width / 1.1)) - 20);

export default function Habits (props) {

  const [showAdicionar, setShow] = useState(false);
  const [habitos, setHabitos] = useState<IHabitos<Object>[]>([]);

  function abrirTelaAdicionar() {
    setShow(true);
  }

  useEffect(() => {
    let resultado = [];
    getAllData().then(res => setHabitos(res));
    
  }, []);
  
  const fecharJanela = (value) => {
    setShow(value);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        
        <View style={{ width: '100%', height: 65, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Habits</Text>
          <TouchableOpacity onPress={() => { abrirTelaAdicionar() }}>
            <FontAwesome5 name={'plus'} color={'#197ee0'} size={24} />
          </TouchableOpacity>
        </View>
        { habitos.length ? habitos.map( item => (
          <Text key={item.id}>{ item.nome }</Text>
        )) : <Text>Sem hábitos por enquanto</Text> }
      </View>
      { showAdicionar && (
          <Adicionador parentCallback={ fecharJanela }/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: marginScreen,
    paddingRight: marginScreen
  },
});