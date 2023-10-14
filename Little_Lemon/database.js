import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export const init = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, price REAL NOT NULL, description TEXT NOT NULL, image TEXT NOT NULL, category TEXT NOT NULL);',
          [],
          () => resolve(),
          (_, err) => reject(err)
        );
      });
    });
  };

  export const insertItem = (name, price, description, image, category) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM menu WHERE name = ?;',
          [name],
          (_, result) => {
            // Check if item already exists
            if (result.rows._array.length === 0) {
              // If it doesn't exist, insert into the database
              tx.executeSql(
                'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);',
                [name, price, description, image, category],
                (_, result) => resolve(result),
                (_, err) => reject(err)
              );
            } else {
              resolve(result); // Resolve without insertion if item exists
            }
          },
          (_, err) => reject(err)
        );
      });
    });
  };
  

  export const fetchItems = (query = '') => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM menu WHERE name LIKE ?;',
          [`%${query}%`],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      });
    });
  };

  export const droptable = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE menu;',
          [],
          () => resolve(),
          (_, err) => reject(err)
        );
      });
    });
  };

