// Import necessary dependencies and modules
const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'your_mysql_host',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_mysql_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Retrieve data by ID
const getDataById = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM data WHERE id = ?', [id]);
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
};

// Update data by ID
const updateDataById = async (id, newData) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('UPDATE data SET ? WHERE id = ?', [newData, id]);
    connection.release();
    return result;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Create new data
const createData = async (newData) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('INSERT INTO data SET ?', [newData]);
    connection.release();
    return result;
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
};

// Delete data by ID
const deleteDataById = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('DELETE FROM data WHERE id = ?', [id]);
    connection.release();
    return result;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

module.exports = {
  getDataById,
  updateDataById,
  createData,
  deleteDataById,
};