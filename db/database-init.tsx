import { DatabaseConnection } from './database-connection';
import * as SQLite from 'expo-sqlite';

var db:SQLite.WebSQLDatabase;

export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection();
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        );

        this.initDb();
    }

    private initDb() {
        var sql = [
            `create table if not exists tarefas (
                id integer primary key autoincrement,
                nome text,
                data_criacao date,
                data_execucao date
            )`,
            `create table if not exists habitos (
                id integer primary key autoincrement,
                nome text,
                frequencia text,
                horario text,
                data_criacao date
            )`
        ];

        db.transaction(tx => {
            for (var i = 0; i < sql.length; i++) {
                console.log("execute sql : " + sql[i]);
                tx.executeSql(sql[i]);
            }
        }, (error) => {
            console.log("error call back : " + JSON.stringify(error));
            console.log(error);
        }, () => {
            console.log("transaction complete call back ");
        });
    }
}