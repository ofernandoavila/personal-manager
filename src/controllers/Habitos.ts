import { DatabaseConnection } from '../../db/database-connection';
import * as SQLite from 'expo-sqlite';

const db:SQLite.WebSQLDatabase = DatabaseConnection.getConnection();

interface IData<Object> {
    dia: number;
    mes: number;
    ano: number;
}

interface IHabitos<Object> {
    id?: Number;
    nome: string;
    frequencia: [];
    horario?: string;
    data_criacao?: IData<Object>;
}

export default class Habitos {

    addHabito(habito: IHabitos<Object>) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1); //January is 0!
        var yyyy = today.getFullYear();

        const hoje: string = yyyy + '/' + mm + '/' + dd;

        let horario = habito.horario ? habito.horario : '';

        console.log(`insert into habitos (nome, frequencia, horario, data_criacao) values (${habito.nome}, ${habito.frequencia}, ${horario}, ${hoje});`)

        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`insert into habitos (nome, frequencia, horario, data_criacao) values (?, ?, ?, ?);`,[habito.nome, habito.frequencia, horario, hoje], (_, { rows }) => {
                resolve('Habito adicionado com sucesso');
            })
        }, (error) => {
            console.log("error call back : " + JSON.stringify(error));
            console.log(error);
        }, () => {
            console.log("transaction complete call back ");
        }));
    }

    getHabitosDia(dia: string) {

        let habitos = [];

        return new Promise<IHabitos<Object>[]>((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from habitos`,[], (_, { rows }) => {
                for(var i = 0; i < rows.length; i++) {
                    let frequencia = JSON.parse(rows.item(i).frequencia);
                    for(var j = 0; j < frequencia.length; j++) {
                        if(frequencia[j].dia == 'D' && frequencia[j].selecionado) {
                            console.log(rows.item(i));
                            break;
                        }
                    }
                }
            })
        }));
    }

    getAllHabitos() {
        let habitos:IHabitos<Object>[] = [];

        return new Promise<IHabitos<Object>[]>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`select * from habitos`,[], (_, { rows }) => {
                    for(var i = 0; i < rows.length; i++) {
                        habitos.push(rows.item(i));
                    }
                });

            });
            resolve(habitos);
        });
    }

}