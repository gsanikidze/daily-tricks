import { ConnectionOptions } from 'typeorm';
import entities from './db';

export const mongoDbConfig: ConnectionOptions = {
  type: 'mongodb',
  url: process.env.DB_URL,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities,
};

export const firebaseConfig = {
  apiKey: 'AIzaSyATNRo9M7DEcqc0PQI4aynFq_Q2gbQTM4M',
  authDomain: 'daily--tricks.firebaseapp.com',
  projectId: 'daily--tricks',
  storageBucket: 'daily--tricks.appspot.com',
  messagingSenderId: '741476400617',
  appId: '1:741476400617:web:bd2c8077ee83884ed21f78',
  measurementId: 'G-WC95GY7CJY',
};
