// src/database/sqlite.js
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('agenda.db');

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      lastname TEXT,
      dni TEXT
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS turns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patientId INTEGER,
      day TEXT,
      hour TEXT,
      place TEXT
    );
  `);

  console.log('SQLite listo');
};

/* ---------- PATIENTS ---------- */

export const getPatients = () => {
  return db.getAllSync('SELECT * FROM patients');
};

export const insertPatient = ({ name, lastname, dni }) => {
  db.runSync(
    'INSERT INTO patients (name, lastname, dni) VALUES (?,?,?)',
    [name, lastname, dni]
  );
};

export const deletePatient = (id) => {
  db.runSync('DELETE FROM patients WHERE id = ?', [id]);
};

/* ---------- TURNS ---------- */

export const getTurns = () => {
  return db.getAllSync('SELECT * FROM turns');
};

export const insertTurn = ({ patientId, day, hour, place }) => {
  db.runSync(
    'INSERT INTO turns (patientId, day, hour, place) VALUES (?,?,?,?)',
    [patientId, day, hour, place]
  );
};

export const deleteTurn = (id) => {
  db.runSync('DELETE FROM turns WHERE id = ?', [id]);
};

export const deleteTurnsByPatient = (patientId) => {
  db.runSync('DELETE FROM turns WHERE patientId = ?', [patientId]);
};
