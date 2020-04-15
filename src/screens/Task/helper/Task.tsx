import React from 'react';
import Lista from '../../../controllers/Lista';

interface IData<Object> {
    dia: number;
    mes: number;
    ano: number;
  }
  
  interface IListaTarefas<Object> {
    id?: number;
    nome: string;
    data_criacao?: string;
    data_execucao: Date;
  }

  interface IArray<Object> {
    _array?: Array<Object>;
  }

export const Task = () => {

};

export const getListOfDay = async (data: IData<Object>) => {

    let lista = new Lista();

    let tarefas: IListaTarefas<Object>[] = await lista.getListaTarefa(data);
    
    return tarefas;
}

export const addTask = async (tarefa: IListaTarefas<Object>) => {
  let lista = new Lista();

  let response = await lista.addTarefa(tarefa);

  return response;
}

export const getAllData = async () => {
  let lista = new Lista();

  let tarefas: IListaTarefas<Object>[] = await lista.getAllTableData();
  
  return tarefas;
}