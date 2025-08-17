import { hashPassword } from "../util/hashPassword";
import { createUser } from "../models/userModel";
export const registerUser = async(req, res) =>{
    const {email, password} = req.body;
    
      try{
        if(await getUserByEmail(email)){
            return res.status(409).json({error: "users exists"});
        }
        passwordHash = hashPassword(password);

        const newUser= await createUser(email, passwordHash);

        res.status(201).json({message: "User registered"});
        
      }catch(err){
        res.status(500).json({error: "Server error"});
      }

}

export const Login= async(req, res) =>{
  const{email, password} = req.body;

  try{
   
    
    
    
  }catch(err){
    res.status(500).json({ error: "Server error" });
  }
}