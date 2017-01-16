import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks'); //cargar la conexion de TASK de la base de datos MDB
