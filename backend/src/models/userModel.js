import { query } from "../db/query.js";

export const createUser = async(email , password) =>{
    const result = await query(`
        INSERT INTO users (email, password_hash) VALUES ($1, $2) 
        RETURNING id, email
        `, [email, password]);
    return result.rows[0];
}

export const getUserByEmail = async(email) =>{
    const result = await query(`
        SELECT * FROM users WHERE email = $1
        `,
    [email]);
    return result.rows[0];
}

export const getUserPassword = async (email) => {
  const result = await query(
    `
        SELECT * FROM users WHERE email = $1
        RETURNING email
        `,
    [email]
  );
  return result.rows[0];
};


