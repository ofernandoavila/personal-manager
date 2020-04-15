import React from 'react';
import Habitos from '../../../controllers/Habitos';

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

export const getHabitsOfDay = async (dia: string) => {

    let habite = new Habitos();

    let habito: IHabitos<Object>[] = await habite.getHabitosDia(dia);
    
    return habito;
}

export const addHabito = async (habito: IHabitos<Object>) => {
  let habite = new Habitos();

  let response = await habite.addHabito(habito);

  return response;
}

export const getAllData = async () => {
    let habite = new Habitos();

    return await habite.getAllHabitos();
}