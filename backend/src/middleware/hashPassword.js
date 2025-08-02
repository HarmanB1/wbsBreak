import bycrypt from 'bcrypt';


export const hashPassword = async (password)=>{
    const saltRounds = 5;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt)
}