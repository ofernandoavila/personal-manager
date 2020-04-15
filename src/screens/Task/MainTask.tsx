import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, CheckBox } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import Checkbox from '../../components/Checkbox';
import { Feather } from '@expo/vector-icons';
import { getListOfDay } from './helper/Task';

const mesNome = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const diaNome = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

interface Props {
  navigation: StackNavigationProp<any>;
}

interface IData<Object> {
  dia: number;
  mes: number;
  ano: number;
  nomeMes: string;
}

interface IListaTarefas<Object> {
  id?: number;
  nome: string;
  data_criacao?: string;
  data_execucao: string;
}


const marginScreen = ((Dimensions.get('screen').width - (Dimensions.get('screen').width / 1.1)) - 20);

export default function MainTask (props: Props) {

  const hoje = new Date;
  const [tarefas, setTarefas] = useState<IListaTarefas<Object>[]>([]);
  const [dataHoje, setDataHoje] = useState({
    dia: hoje.getDate(),
    mes: hoje.getMonth(),
    ano: hoje.getFullYear()
  });

  const [diaSemana, setDiaSemana] = useState('');

  useEffect(() => {
    setDataHoje({
      dia: hoje.getDate(),
      mes: (hoje.getMonth()),
      ano: hoje.getFullYear()
    });

    setDiaSemana(diaNome[hoje.getDay()]);

    getListOfDay(dataHoje).then(res => setTarefas(res));
  }, []);

  useEffect(() => {
    getListOfDay(dataHoje).then(res => setTarefas(res));
    
    let dia = new Date(dataHoje.ano, dataHoje.mes, dataHoje.dia);
    setDiaSemana(diaNome[dia.getDay()]);
  }, [dataHoje]);

  function prevDay() {
    let today = new Date(dataHoje.ano, dataHoje.mes, dataHoje.dia);

    today.setDate(today.getDate() - 1)
    let dia = Number(today.getDate());
    let mes = Number(today.getMonth());
    let ano = today.getFullYear();

    setDiaSemana(diaNome[today.getDay()]);

    setDataHoje({ dia, mes, ano });
  }

  function nextDay() {
    let today = new Date(dataHoje.ano, dataHoje.mes, dataHoje.dia);

    today.setDate(today.getDate() + 1)
    let dia = Number(today.getDate());
    let mes = Number(today.getMonth());
    let ano = today.getFullYear();

    setDataHoje({ dia, mes, ano });
  }

  function rendereizarTarefas(tarefas: IListaTarefas<Object>[]) {
    if(tarefas.length <= 0) {
      return <Text>Não há tarefas para hoje</Text>
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.dayIndicator}>
          <TouchableOpacity onPress={() => {prevDay()}} style={styles.arrowNext}>
            <Feather name={'arrow-left'} size={45} />
          </TouchableOpacity>
          <View style={styles.currentDate}>
            <Text style={styles.currentMonth}>{ mesNome[dataHoje.mes] }</Text>
            <Text style={styles.currentDay}>{ dataHoje.dia }</Text>
            <Text style={styles.currentDayName}>{ diaSemana }</Text>
          </View>
          <TouchableOpacity onPress={() => {nextDay()}} style={styles.arrowNext}>
            <Feather name={'arrow-right'} size={45} />
          </TouchableOpacity>
        </View>
        
        {/* Apply a divisor between de callendar day and the tasks */}
        <View style={styles.divisor}></View>

        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Habits</Text>
        </View>

        <View style={{ marginBottom: 15 }}>
          <Text>Não há hábitos disponíveis</Text>
        </View>

        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Tasks</Text>
        </View>

        { tarefas.map(item => (
          <Checkbox key={item.id} titulo={item.nome} />
        )) }

        { rendereizarTarefas(tarefas) }


      </View>
      
      <View style={{ position: 'absolute', bottom: 15, right: 15 }}>
        <View style={{ width: 50, height: 50, backgroundColor: '#197ee0', borderRadius: 50 }}>
          <TouchableOpacity onPress={() => { props.navigation.replace('AddTask') }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Feather name={'plus'} size={30} color={'#FFF'}/>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: marginScreen,
    paddingRight: marginScreen
  },
  dayIndicator: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowNext: {

  },
  currentDate: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  currentDayName: {
    alignSelf: 'center',
    fontSize: 16,
    textAlign: 'center'
  },
  currentDay: {
    alignSelf: 'center',
    fontSize: 60,
    textAlign: 'center'
  },
  currentMonth: {
    fontSize: 32,
    textAlign: 'center'
  },
  divisor: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
    height: 2,
    backgroundColor: '#AAA',
    alignSelf: 'center'
  }
});