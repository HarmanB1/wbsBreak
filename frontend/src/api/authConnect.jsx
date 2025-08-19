export const login = async(email, password) =>{
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})

    });
    return res.json
}

export const signUpConnect = async (email, password) => {
    try{
        const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if(!res.ok){
    const {error} = await res.json();
    throw new Error(error || "signup failed");
  }else{
     return res.json;
  }

    }catch(err){
        console.log(err.message);
    }
  
 
};