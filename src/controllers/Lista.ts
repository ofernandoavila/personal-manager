import { DatabaseConnection } from '../../db/database-connection';
import * as SQLite from 'expo-sqlite';

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

interface ITarefa<Object> {
    titulo: string;
    dataExecucao: IData<Object>
}

const db:SQLite.WebSQLDatabase = DatabaseConnection.getConnection();

export default class Lista {

    private lista:IListaTarefas<Object>[] = [];

    addTarefa(tarefa: IListaTarefas<Object>) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1); //January is 0!
        var yyyy = today.getFullYear();

        var destino = tarefa.data_execucao;
        var dd2 = String(destino.getDate()).padStart(2, '0');
        var mm2 = String(destino.getMonth() + 1); //January is 0!
        var yyyy2 = destino.getFullYear();

        const hoje: string = yyyy + '/' + mm + '/' + dd;

        const execucao: string = yyyy2 + '/' + mm2 + '/' + dd2;

        console.log(`insert into tarefas (nome, data_criacao, data_execucao) values (${tarefa.nome}, ${hoje}, ${execucao});`)

        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`insert into tarefas (nome, data_criacao, data_execucao) values (?, ?, ?);`,[tarefa.nome, hoje, execucao], (_, { rows }) => {
                resolve('Tarefa adicionada com sucesso');
            })
        }, (error) => {
            console.log("error call back : " + JSON.stringify(error));
            console.log(error);
        }, () => {
            console.log("transaction complete call back ");
        }));
    }

    async getListaTarefa(dataProp: IData<Object>) {
        let data: IData<Object> = dataProp;

        let dataPesquisa: string = data.ano + '/' + (data.mes + 1) + '/' + data.dia;
        let lista:IListaTarefas<Object>[] = [];

        return new Promise<IListaTarefas<Object>[]>((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from tarefas where data_execucao = ?`,[dataPesquisa], (_, { rows }) => {
                for(var i = 0; i < rows.length; i++) {
                    lista.push(rows.item(i));
                }

                resolve(lista);
            })
        }));
    }

    getTarefasPorDia(data: IData<Object>) {
        return this.lista;
    }

    getAllTableData() {
        
        let lista:IListaTarefas<Object>[] = [];
        
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from tarfas;`,[], (_, { rows }) => {
                for(var i = 0; i < rows.length; i++) {
                    lista.push(rows.item(i));
                }

                resolve(lista);
            })
        }));
    }

}