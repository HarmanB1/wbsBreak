import { hashPassword } from "../util/hashPassword";
export const registerUser = async(req, res) =>{
    const {email, password} = req.body;
    
      try{
        if(!email || !password){
            return res.status(400).json({error: "email or password not sent"});
        }

        if(await getUserByEmail(email)){
            return res.status(409).json({error: "users exists"});
        }
        passwordHash = hashPassword(password);

        const newUser= await createUser(email, passwordHash);

        res.status(201).json({message: "User registered"})
        
        
      }catch(err){
        //add later
        console.log(err);
      }

}