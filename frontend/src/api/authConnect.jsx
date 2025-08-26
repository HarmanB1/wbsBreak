export const login = async(email, password) =>{
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})

    });
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || "Signup failed");
    }
    return res.json
}

export const registerUser = async (email, password) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Signup failed");
  }

  return res.json();
};