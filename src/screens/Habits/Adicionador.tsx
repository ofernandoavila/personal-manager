import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';

import { addHabito } from './helper/Habite';

let corSelecionado = '#197ee0';

export default function Adicionador (props) {
    const [dias, setDiasSelecionados] = useState([
        {
          dia: 'D',
          selecionado: false
        },
        {
          dia: 'S',
          selecionado: false
        },
        {
          dia: 'T',
          selecionado: false
        },
        {
          dia: 'Q',
          selecionado: false
        },
        {
          dia: 'Q',
          selecionado: false
        },
        {
          dia: 'S',
          selecionado: false
        },
        {
          dia: 'S',
          selecionado: false
        }
      ]);
      const [nomeHabito, setNomeHabito] = useState('');

    
    function salvarTarefa() {
        let frequencia = JSON.stringify(dias);
        addHabito({
            nome: nomeHabito,
            frequencia
        }).then(res => ToastAndroid.show(res, ToastAndroid.LONG)).then(() => fecharTelaAdicionar());
    }

    function selecionarDia(dia: any) {
        let lista = dias;
        let novaLista = [];

        for(let i = 0; i < lista.length; i++) {
        let item = lista[i];
        if(lista[i] == lista[dia]) {
            lista[i].selecionado = !lista[i].selecionado;
        }

        novaLista.push(item);
        }

        setDiasSelecionados(novaLista);

    }

    function fecharTelaAdicionar() {
      props.parentCallback(false);
    }
    return (
        <View style={{ position: 'absolute', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height, backgroundColor: 'rgba(0,0,0, 0.6)' }}>
              <View style={{ flex: 1, marginTop: 180, alignItems: 'center' }}>
                <View style={{ width: Dimensions.get('screen').width / 1.2, height: 200, padding: 10, justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, backgroundColor: '#FFF' }}>
                  <View style={{ width: '90%', flexDirection: 'row', alignSelf: 'center' }}>
                    <TextInput onChangeText={text => setNomeHabito(text)} style={{ flex: 1, borderColor: '#AAA', borderWidth: 1, borderRadius: 8, padding: 10 }} placeholder={'Nome do hábito'} />
                  </View>
                  <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
                    <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => selecionarDia(0)}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: dias[0].selecionado ? corSelecionado : '#CCC' }}>{ dias[0].dia }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => selecionarDia(1)}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: dias[1].selecionado ? corSelecionado : '#CCC' }}>{ dias[1].dia }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => selecionarDia(2)}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: dias[2].selecionado ? corSelecionado : '#CCC' }}>{ dias[2].dia }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => selecionarDia(3)}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: dias[3].selecionado ? corSelecionado : '#CCC' }}>{ dias[3].dia }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => selecionarDia(4)}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: dias[4].selecionado ? corSelecionado : '#CCC' }}>{ dias[4].dia }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => selecionarDia(5)}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: dias[5].selecionado ? corSelecionado : '#CCC' }}>{ dias[5].dia }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => selecionarDia(6)}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: dias[6].selecionado ? corSelecionado : '#CCC' }}>{ dias[6].dia }</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
                      <TouchableOpacity style={{  }} onPress={() => fecharTelaAdicionar()}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#197ee0' }}>Fechar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{}} onPress={() => salvarTarefa()}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#197ee0' }}>Salvar</Text>
                      </TouchableOpacity>
                    </View>
                </View>
              </View>
          </View>
    )   
}