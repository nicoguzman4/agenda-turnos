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


export const getPatients = async () => {
  const result = await db.getAllAsync('SELECT * FROM patients;');
  return result;
};

export const insertPatient = async ({ name, lastname, dni }) => {
  await db.runAsync(
    'INSERT INTO patients (name, lastname, dni) VALUES (?,?,?)',
    [name, lastname, dni]
  );
};

export const deletePatient = async (id) => {
  await db.runAsync('DELETE FROM patients WHERE id = ?', [id]);
};


export const getTurns = async () => {
  const result = await db.getAllAsync('SELECT * FROM turns;');
  return result;
};

export const insertTurn = async ({ patientId, day, hour, place }) => {
  await db.runAsync(
    'INSERT INTO turns (patientId, day, hour, place) VALUES (?,?,?,?)',
    [patientId, day, hour, place]
  );
};
