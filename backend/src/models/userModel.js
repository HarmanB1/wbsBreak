import { query } from "../db/query";

export const createUser = async(email , password) =>{
    const result = await query(`
        INSERT INTO users (email, password_hash) VALUS ($1, $2) 
        RETURNING id, email
        `);
    return result.rows[0];
}

export const getUserByEmail = async(email) =>{
    const result = await query(`
        SELECT * FROM users WHERE email = $1
        `,
    [email]);
    return result.rows[0];
}