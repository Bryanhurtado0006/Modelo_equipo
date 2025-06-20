import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");

  const IniciarLogueo = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const res = await response.json()
    console.log(res);

    if (res.msj =="Usuario logeado correctamente") {
      
      
      localStorage.setItem("auth", "true");
      localStorage.setItem("email", email)
      localStorage.setItem("nombre", res.nombre)
      navigate("/home");
    } else {
      alert("Login fallido");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={IniciarLogueo}><input type="email"placeholder="Correo"value={email} onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
        <Link to="/register">Registrarse </Link>
      </form>
    </div>
  );
};

export default Login;
